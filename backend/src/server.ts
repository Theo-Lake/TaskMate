import "dotenv/config";
import app from "./app" //TODO check error caused by undefined js file type? cuz it compiles in js but file is ts

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));


