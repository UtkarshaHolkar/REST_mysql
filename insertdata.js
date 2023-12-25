const connection = require("./db");

const partyQuery = `INSERT INTO Party (PARTY_ID, PARTY_TYPE_ENUM_ID)
VALUES 
    ('ORG_ZIZI_RETAIL', 'PtyOrganization'),
    ('CustDemo1', 'PtyPerson'),
    ('CustDemo2', 'PtyPerson');
`;

const personQuery = `INSERT INTO Person (PARTY_ID, FIRST_NAME, MIDDLE_NAME, LAST_NAME, GENDER, MARITAL_STATUS_ENUM_ID)
VALUES 
    ('CustDemo1', 'Joe', 'Q', 'Public', 'F', 'MarsSingle'),
    ('CustDemo2', 'Jack', 'Q', 'Smith', 'M', 'MarsMarried');
`;

const productQuery = `INSERT INTO Product (PRODUCT_ID, OWNER_PARTY_ID, PRODUCT_NAME, CHARGE_SHIPPING, RETURNABLE)
VALUES
  ('DEMO_UNIT', 'ORG_ZIZI_RETAIL', 'Demo Product One Unit', 'Y', 'Y'),
  ('DEMO_1_1', 'ORG_ZIZI_RETAIL', 'Demo Product One One', 'Y', 'Y'),
  ('DEMO_1_2', 'ORG_ZIZI_RETAIL', 'Demo Product One Two', 'Y', 'Y');
`;



// connection.query(partyQuery, (error) => {
//     if (error) {
//       console.log("Error in party data");
//       throw error;
//     }
  
//     console.log("inserted party data");
// });

// connection.query(personQuery, (error) => {
//     if (error) {
//       console.log("Error in person data");
//       throw error;
//     }
  
//     console.log("inserted person data");
//   });
  

  connection.query(productQuery, (error) => {
    if (error) {
      console.log("Error in product data");
      throw error;
    }
  
    console.log("inserted product data");
  });
  