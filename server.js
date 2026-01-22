const express = require("express");
const crypto = require("crypto");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const path = require("path");

const app = express();
app.use(express.json());
app.use(helmet());

/* RATE LIMIT – brute force yok */
app.use("/admin-login", rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5
}));

/* STATIC */
app.use(express.static("public"));

/* ENV HASH */
const ADMIN_HASH = process.env.ADMIN_HASH;
if (!ADMIN_HASH) {
  console.error("ADMIN_HASH YOK!");
  process.exit(1);
}

/* LOGIN */
app.post("/admin-login", (req, res) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ ok: false });

  const hash = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  if (hash === ADMIN_HASH) {
    return res.json({ ok: true });
  }

  res.status(401).json({ ok: false });
});

/* PANEL KORUMA */
app.get("/admin-check", (req, res) => {
  res.json({ ok: true });
});

/* START */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("LORD API PANEL AKTIF:", PORT)
);
