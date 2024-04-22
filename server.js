import express, { static as serveStatic } from "express";
import shrinkRay from "shrink-ray-current";
import { URL } from "url";
const app = express();

// Enable Brotli compression
app.use(shrinkRay());

// Serve the static files
app.use(serveStatic("dist"));

app.get("*", (_req, res) => {
  res.sendFile(new URL("./dist/index.html", import.meta.url).pathname);
});

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
