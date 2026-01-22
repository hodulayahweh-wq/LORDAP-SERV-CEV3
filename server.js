import express from "express";

const app = express();
app.use(express.json());
app.use(express.static("."));

/* 🔐 ŞİFRE ARTIK ENV'DEN */
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

/* ADMIN LOGIN */
app.post("/admin-login", (req, res) => {
  const { password } = req.body;

  if (password === ADMIN_PASSWORD) {
    return res.sendStatus(200);
  }
  return res.sendStatus(401);
});

/* SITE */
app.get("*", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("LORD API PANEL AKTİF :", PORT);
});
