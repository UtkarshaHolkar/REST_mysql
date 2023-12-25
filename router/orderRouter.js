const express = require("express");
const app = express();
const connection = require("../db");
const orderRouter = express.Router();

// const getOrderHandler

const createOrderHandler = (req, res) => {
  const {
    orderName,
    currencyUomId,
    salesChannelEnumId,
    statusId,
    productStoreId,
    placedDate,
    approvedDate,
  } = req.body;

  if (currencyUomId == undefined) currencyUomId = "USD";
  if (statusId == undefined) statusId = "OrderPlaced";

  if (orderName == undefined || placedDate == undefined) {
    res.status(400);
    res.send("orderName and placedDate is required");
  }

  function createOrder(idToUse) {
    const query = `INSERT INTO order_header VALUES(${idToUse}, '${orderName}','${placedDate}', '${approvedDate}','${statusId}', '${currencyUomId}','${productStoreId}','${salesChannelEnumId}', '${2}','${placedDate}');`;
    connection.query(query, (error) => {
      if (error) {
        res.json("Failed to create order");
        throw error;
      }

      res.json({ msg: "Order created", orderId: idToUse });
    });
  }

  connection.query(
    `Select order_id from order_header order by order_id desc limit 1;`,
    (err, result1) => {
      if (err) throw err;

      const currId = result1[0]["order_id"];
      let newId;
      if (currId) {
        newId = Number(currId) + 1;
      } else {
        newId = 1;
      }

      createOrder(newId);
    }
  );
};

const getOrderHandler = (req, res) => {
  const { order_id } = req.body;
  const query = `SELECT * from order_header where order_id = '${order_id}';`;

  connection.query(query, (error, result) => {
    if (error) throw error;

    // const id = rows[0].ORDER_ID;

    // if (id) {
    console.log(result[0]);
    // }

    // return id;

    res.json("yo");
  });
};

app.post("/orderHeader", createOrderHandler);
orderRouter.get("/getOrderHandeler", getOrderHandler);

module.exports = orderRouter;
