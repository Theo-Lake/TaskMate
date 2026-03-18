import express, {Request, Response} from "express";
import routes from "./routes/router"  // Might have an error here because it should be index.js (since node compiles in js not ts)
import cors from "cors";

const app = express();

app.use(cors());    // This has to be removed later on because it will cause issues with SQL injections and safety.
app.use(express.json());

// Getting health check
// _req is to acknowledge need of parameter, though not the use of it in this current instance.
app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskmate-backend" });
});

// Mounting all API routes under /api
app.use("/api", routes);

export default app;