import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import routes from "./routes/index.js";
                    //imports need to be js because ts compiles into js

const app = express();
app.use(cors());    // This has to be removed later on because it will cause issues with SQL injections and safety.
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "ok", service: "taskmate-backend" });
});

app.use("/api", routes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


