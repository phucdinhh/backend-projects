import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.js";
import guestRoutes from "./routes/guest.js";
import adminRoutes from "./routes/admin.js";

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my-blog-secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 4, // 4 hours
    },
  })
);

app.use(guestRoutes);
app.use(authRoutes);
app.use(adminRoutes);

app.listen(3005, () => {
  console.log("Server started on http://localhost:3005");
});
