import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

app.use(
  express.json({
    verify: (req, _res, buf) => {
      // store raw body safely
      (req as any).rawBody = buf;
    },
  })
);

app.use(express.urlencoded({ extended: false }));

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

/* Request logger middleware */
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json.bind(res);
  res.json = function (bodyJson: any, ...args: any[]) {
    capturedJsonResponse = bodyJson;
    return originalResJson(bodyJson, ...args);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        try {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        } catch {
          // ignore stringify errors
        }
      }
      log(logLine);
    }
  });

  next();
});

/* Graceful error handler - do NOT throw after sending response */
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err?.status || err?.statusCode || 500;
  const message = err?.message || "Internal Server Error";
  log(`Error: ${message} (status ${status})`, "error");
  // make sure to send a JSON error response but do not crash the process
  try {
    res.status(status).json({ message });
  } catch {
    // if sending response fails, just log
    log("Failed to send error response", "error");
  }
});

/* Main startup */
(async () => {
  try {
    // Optional seed (already protected by try/catch in your earlier code)
    try {
      const { seed } = await import("./seed");
      await seed();
    } catch (e) {
      log(`Seed step skipped/failed: ${(e as Error).message}`, "seed");
    }

    await registerRoutes(httpServer, app);

    // serve static only in production
    if (process.env.NODE_ENV === "production") {
      serveStatic(app);
    } else {
      const { setupVite } = await import("./vite");
      await setupVite(httpServer, app);
    }

    // listen on Railway-provided port; default to 8080
    const port = Number(process.env.PORT || 8080);
    // bind to 0.0.0.0 so external checks can reach the container
    httpServer.listen(port, "0.0.0.0", () => {
      log(`serving on port ${port}`);
    });

    // Graceful shutdown handlers
    const shutdown = (signal: string) => {
      return async () => {
        log(`Received ${signal}. Shutting down gracefully...`, "shutdown");
        try {
          httpServer.close(() => {
            log("HTTP server closed.", "shutdown");
            // process.exit will be handled by platform; but exit to be safe
            process.exit(0);
          });
        } catch (err) {
          log(`Error during shutdown: ${(err as Error).message}`, "shutdown");
          process.exit(1);
        }
      };
    };

    process.on("SIGTERM", shutdown("SIGTERM"));
    process.on("SIGINT", shutdown("SIGINT"));

    // Optional: catch unhandled rejections and log (avoid crash)
    process.on("unhandledRejection", (reason) => {
      log(`Unhandled Rejection: ${JSON.stringify(reason)}`, "process");
    });
    process.on("uncaughtException", (err) => {
      log(`Uncaught Exception: ${(err as Error).message}`, "process");
      // For uncaughtException you may want to exit; here we log and let platform restart.
    });
  } catch (startupErr) {
    log(`Startup failed: ${(startupErr as Error).message}`, "startup");
    // ensure that if startup fails, we exit with non-zero so Railway restarts
    process.exit(1);
  }
})();
