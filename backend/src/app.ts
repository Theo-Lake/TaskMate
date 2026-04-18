import express, {Request, Response} from "express";
import routes from "./routes/router"  // Might have an error here because it should be index.js (since node compiles in js not ts)
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: { error: "Too many requests, please try again later." },
});

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());
app.use(limiter);

// Getting health check
// _req is to acknowledge need of parameter, though not the use of it in this current instance.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskmate-backend" });
});

// Mounting all API routes under /api
app.use("/api", routes);

export default app;