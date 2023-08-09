const express = require("express");
const app = express();
app.use(express.json());
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
app.use(cors());
app.listen(5000, () => {
  console.log("Server Has Started At Port 5000");
});

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "form.db");

let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

initializeDbAndServer();

app.post("/registration", async (request, response) => {
  const { id, name, email, number, password } = request.body;
  const usernameQuery = `SELECT * FROM user_data WHERE name LIKE '${name}';`;
  const emailQuery = `SELECT * FROM user_data WHERE email LIKE '${email}';`;
  const numberQuery = `SELECT * FROM user_data WHERE number LIKE '${number}';`;
  const usernameResult = await db.get(usernameQuery);
  const emailResult = await db.get(emailQuery);
  const numberResult = await db.get(numberQuery);

  let value = {};
  if (usernameResult !== undefined) {
    value.username = "Username Already Exists";
  }
  if (emailResult !== undefined) {
    value.email = "Email Already Exists";
  }
  if (numberResult !== undefined) {
    value.number = "Number Already Exists";
  }
  if (usernameResult !== undefined && emailResult !== undefined) {
    value.username = "Username Already Exists";
    value.email = "Email Already Exists";
  }

  if (usernameResult !== undefined && numberResult !== undefined) {
    value.username = "Username Already Exists";
    value.number = "Number Already Exists";
  }

  if (emailResult !== undefined && numberResult !== undefined) {
    value.email = "Email Already Exists";
    value.number = "Number Already Exists";
  }

  if (
    usernameResult !== undefined &&
    emailResult !== undefined &&
    numberResult !== undefined
  ) {
    value.username = "Username Already Exists";
    value.email = "Email Already Exists";
    value.number = "Number Already Exists";
  }

  if (
    usernameResult === undefined &&
    emailResult === undefined &&
    numberResult === undefined
  ) {
    const cryptedPassword = await bcrypt.hash(password, 10);
    const query = `INSERT INTO user_data (id, name, email, number, password) VALUES( '${id}', '${name}', '${email}', '${number}', '${cryptedPassword}');`;
    await db.run(query);
    return response.status(200).send({ success: "Added Successfully" });
  }
  response.status(401).send(value);
});

app.post("/login", async (request, response) => {
  const { name, password } = request.body;
  const query = `SELECT * FROM user_data WHERE name LIKE '${name}';`;
  const dbResult = await db.get(query);
  if (dbResult === undefined) {
    response.status(401).send({ username: "Username Not Found" });
  } else {
    const checkPassword = await bcrypt.compare(password, dbResult.password);
    if (checkPassword) {
      const payload = {
        name,
      };
      const jwtToken = await jwt.sign(payload, "SIGN_IN");
      response.send({ jwtToken });
    } else {
      response.status(401).send({ password: "Invalid Password" });
    }
  }
});
