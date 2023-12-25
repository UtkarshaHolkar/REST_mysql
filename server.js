const express = require("express");
const app = express();
var bodyParser = require("body-parser");
const  connection = require("./db");
const PORT = 3000;

app.listen(PORT , () => {
    console.log("Server is running on : " , PORT)
})


app.get("/person" , (req , res ) => {
    connection.query("select * from person" , (err , rows) => {
       if(err) {
        console.log(err);
       }else{
           res.send(rows);
       }
    })
})



app.get("/party" , (req , res ) => {
    connection.query("select * from party" , (err , rows) => {
       if(err) {
        console.log(err);
       }else{
           res.send(rows);
       }
    })
})



app.use(bodyParser.json());

app.post("/party", (req, res) => {
  const { party_Id, party_Type_Enum_Id } = req.body;

  if (!party_Id || !party_Type_Enum_Id) {
    return res.status(400).json({ error: "partyId and partyTypeEnumId are required" });
  }

  const query = `INSERT INTO party (PARTY_ID,   PARTY_TYPE_ENUM_ID ) VALUES (?, ?)`;
  connection.query(query, [party_Id, party_Type_Enum_Id], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Failed to create party" });
    }

    console.log("Party created:", result);
    res.status(201).json({ message: "Party created successfully", party_Id });
  });
});


// post person

app.post("/person", (req, res) => {
  const {
    party_Id,
    salutation,
    first_Name,
    middle_Name,
    last_Name,
    gender,
    birth_Date,
    marital_Status_Enum_Id,
    employment_Status_Enum_Id,
    occupation,
  } = req.body;

  if (!partyId || !salutation || !firstName || !lastName) {
    return res.status(400).json({ error: "Required fields are missing for creating a person" });
  }

  const query = `
    INSERT INTO person (
      party_Id,
      salutation,
      first_Name,
      middle_Name,
      last_Name,
      gender,
      birth_Date,
      marital_Status_Enum_Id,
      employment_Status_Enum_Id,
      occupation,
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    party_Id,
    salutation,
    first_Name,
    middle_Name || null,
    last_Name,
    gender || null,
    birth_Date || null,
    marital_Status_Enum_Id || null,
    employment_Status_Enum_Id || null,
    occupation || null,
  ];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to create a person" });
    }

    res.status(201).json({ message: "Person created successfully", partyId });
  });
});



app.post('/orders', (req, res) => {
  const {
    orderName,
    currencyUomId = 'USD', // Defaults to USD if not provided
    salesChannelEnumId = 'ScWeb',
    statusId = 'OrderPlaced', // Defaults to OrderPlaced if not provided
    productStoreId = 'OMS_DEFAULT_STORE',
    placedDate,
    approvedDate,
  } = req.body;

  // Check for required fields
  if (!orderName || !placedDate) {
    res.status(400).json({ error: 'orderName and placedDate are required' });
    return;
  }

  const query = `INSERT INTO orders (orderName, currencyUomId, salesChannelEnumId, statusId, productStoreId, placedDate, approvedDate) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [orderName, currencyUomId, salesChannelEnumId, statusId, productStoreId, placedDate, approvedDate],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create order' });
        return;
      }
      res.status(201).json({ message: 'Order created successfully', orderId: result.insertId });
    }
  );
});

