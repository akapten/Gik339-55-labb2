const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors"); // Assuming you have installed cors package
const server = express();
const port = 3000;

// Use CORS middleware for handling CORS policies
server.use(cors());

server.use(express.json())
  .use(express.urlencoded({ extended: false }));

const db = new sqlite3.Database("./gik339-labb2.db", (err) => {
  if (err) {
    console.error("Kan inte öppna databasen", err.message);
  } else {
    console.log("Ansluten till SQLite-databasen");
  }
});

server.get("/users", (req, res) => {
  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err) {
      console.error("Fel vid databasförfrågan:", err.message);
      res.status(500).send({ error: "Databasförfrågan misslyckades" });
      return;
    }
    res.json(rows);
  });
});

server.listen(port, () => console.log(`Server running on port ${port}`));

// Graceful shutdown
process.on("SIGINT", () => {
  db.close((err) => {
    if (err) {
      console.error("Stänga databas går ej", err.message);
      process.exit(1);
    } else {
      console.log("Databaskoppling stängd");
      process.exit(0);
    }
  });
});
