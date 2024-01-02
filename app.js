const express = require("express");
const { connection, knex } = require("./connection");
const app = express();
require("dotenv").config();
var bodyParser = require("body-parser");
var moment = require("moment");
const port = connection.port || 2000;

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("REST API Online Driver");
});

// Get list users
app.get("/users", async (req, res) => {
  try {
    const users = await knex("users");
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      error: "Something Wrong",
    });
  }
});

// Orders
// Get List Orders
app.get("/orders", async (req, res) => {
  try {
    const orders = await knex("transaction");
    res.send(orders);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      error: "Something Wrong",
    });
  }
});

// User make order by input username and distance
app.post("/orders", async (req, res) => {
  try {
    const date = moment().format("yyyy-M-DD hh:mm:ss");
    const { distance, username } = req.body;

    let user = await knex("users").where("username", username).first();

    if (!user) {
      const [user_id] = await knex("users").insert({
        username,
        dateCreated: date,
        dateModified: date,
      });
      user = { id: user_id };
    }

    const ordersCount = await knex("transaction")
      .where("user_id", user.id)
      .count("id", { as: "totalOrders" })
      .first();
    const price = distance * 10000;
    const total_price = discount(ordersCount.totalOrders, distance, price);

    await knex("transaction").insert({
      user_id: user.id,
      price: total_price,
      raw_price: price,
      distance,
      dateCreated: date,
      dateModified: date,
    });

    res.send({
      username,
      distance,
      price: total_price,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      statusCode: 500,
      error: "Something Wrong",
    });
  }
});

app.listen(port, () => {
  console.log(`app running at http://localhost:${port}`);
});

function discount(orders, distance, price) {
  // Discount from price
  if (distance >= 100) {
    price = price - (price * 10) / 100;
  } else if (distance >= 50) {
    price = price - (price * 5) / 100;
  }

  // Discount from orders
  if (orders >= 5) {
    price = price - (price * 30) / 100 + (price * 10) / 100;
  } else if (orders >= 2) {
    price = price - (price * 20) / 100;
  }

  return price;
}
