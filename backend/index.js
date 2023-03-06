import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import colors from "colors";
import { connectionDB } from "./utils/myDb.js";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";

GoogleStrategy.Strategy;

const app = express();
connectionDB();

dotenv.config();
app.use(cors());
app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

//routes
// ---------------------------
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
// ---------------------------

app.listen(5000, () => {
  console.log(`server has runing on => PORT${5000}`.blue);
});
