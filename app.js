var mysql = require('mysql2');
//const mysql = require("mysql2");
const express = require("express");
const app = express();
const port = 3000;

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "01SQLpwd#$",
  database: "kvideodb"
});

// SELECT 5 records
con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM customers LIMIT 5";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
});

// Display the 5 records
app.get( "/", function(req,res) {
    res.setHeader("Access-Control-Origin-Allow","*");
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.send(JSON.stringify(
        {
            id: 1,
            firstname: 'John',
            lastname: 'Doe',
            email: 'jdoe@gmail.com',
            password: 'jdpass',
            address: 'Highway 71',
            datejoined: '2024-01-01T16:30:00.000Z',
            lastlogin: '2024-01-01T18:30:00.000Z'
          }
    ));
});

// INSERT 1 record
app.post('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 1,
        firstname: 'test',
        lastname: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        address: 'Test Hway 71',
        datejoined: '2024-01-01T16:30:00.000Z',
        lastlogin: '2024-01-01T18:30:00.000Z'
    
        }
  ));

  var sql = "INSERT INTO customers (firstname, lastname, email, password, address, datejoined, lastlogin) VALUES ?";
  var values = [
    ['test', 'test', 'test@gmail.com', 'testpass', 'Test 71', '2024-01-01 11:30:00', '2024-01-01 13:30:00']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records inserted: " + result.affectedRows);
  });

});

// Update 1 record
app.put('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 1,
        firstname: 'test',
        lastname: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        address: 'Test Hway 71',
        datejoined: '2024-01-01T16:30:00.000Z',
        lastlogin: '2024-01-01T18:30:00.000Z'
    
        }
  ));

  var sql = "UPDATE customers SET address = 'Canyon 123' WHERE id = '1'";
  var values = [
    ['test', 'test', 'test@gmail.com', 'testpass', 'Test 71', '2024-01-01 11:30:00', '2024-01-01 13:30:00']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records updated: " + result.affectedRows);
  });

});

// Delete 1 record
app.delete('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 18,
        firstname: 'test',
        lastname: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        address: 'Test Hway 71',
        datejoined: '2024-01-01T16:30:00.000Z',
        lastlogin: '2024-01-01T18:30:00.000Z'
    
        }
  ));

  var sql = "DELETE FROM customers WHERE firstname = 'test'";
  var values = [
    ['test', 'test', 'test@gmail.com', 'testpass', 'Test 71', '2024-01-01 11:30:00', '2024-01-01 13:30:00']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records deleted: " + result.affectedRows);
  });

});

app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});