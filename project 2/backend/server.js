import express from "express";
import { ENV_VARS } from "./config/envVars.js";
import { authRoutes, dbRoutes } from "./routes/index.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import path from "path";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"], // Replace with your frontend's origin
    credentials: true, // Allows cookies to be sent
  })
);
app.use(express.json()); // will allow us to parse req.body
app.use(cookieParser());
app.use(
  session({
    secret: "aswdrfgttE4Ba0cfD@",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      secure: false, //since no ssl certificate configuration
      httpOnly: true,
      sameSite: "lax",
    },
    name: "authCookie",
  })
);

const __dirname = path.resolve();

// for testing purpose
// app.use((req, res, next) => {
//   console.log(
//     `${new Date().toISOString()} - ${req.method} request to ${req.url}`
//   );

//   console.log("server base path ", res.session, "--end");
//   next();
// });

app.use("/v1/auth", authRoutes);
app.use("/v1/db", dbRoutes);

if (ENV_VARS.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// app.get("/test", (req, res) => {
//   res.send("server working");
// });

app.listen(ENV_VARS.PORT, () => {
  console.log(`sever started on : http://localhost:${ENV_VARS.PORT}`);
  connectDB();
});
