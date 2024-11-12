const express = require("express");
const sql = require("mssql");

const app = express();
app.use(express.json());

// Todos los cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const sqlConfig = {};

app.get("/", async (req, res) => {
  try {
    await sql.connect(sqlConfig);
    console.log("Connected to database");
    const result = await sql.query`SELECT * FROM sensordata ORDER BY date DESC`;
    return res.json(result.recordset[0]);
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      console.log(error.message);
      return res.status(500).json({ message: error.message });
    }
  }
});

app.listen(3032, () => {
  console.log("Server is running on port 3032");
});
