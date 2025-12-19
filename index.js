const exp = require("express");
const app = exp();

app.use(exp.json());
const CorseRouter = require("./Routes/CorsesRoute");

app.use("/api/courses", CorseRouter);

module.exports = app; // 👈 مهم
