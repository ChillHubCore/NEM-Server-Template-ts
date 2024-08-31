import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import process from "process";

// cors.ts

dotenv.config();
// Allow a specific address to access the server (replace with the actual addresses)
console.log("Running CORS Middleware...");
const allowedOrigin: string[] = [
  `${process.env.allowedOrigin}`,
  `${process.env.serverOrigin}`,
];
console.log("Serving For " + allowedOrigin);

const corsOptions: CorsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
};

export default cors(corsOptions);
