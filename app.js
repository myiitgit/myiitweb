var mysql = require('mysql2');
//const mysql = require("mysql2");
const express = require("express");
const dotenv = require('dotenv');
const app = express();
const port = 3000;

app.set('view engine', 'hbs')

// other imports
const path = require("path")
const publicDir = path.join(__dirname, './public')
app.use(express.static(publicDir))

const bcrypt = require("bcryptjs")

// configure the Express.js server to receive the form values as JSON:
app.use(express.urlencoded({extended: 'false'}))
app.use(express.json())

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "01SQLpwd#$",
  database: "kvideodb"
});

// START customer registration
app.get("/", (req, res) => {
  res.render("index")
  })
  
  app.get("/", (req, res) => {
  res.render("account")
  })
  
  app.get("/auth/login", (req, res) => {
  res.render("login")
  })
  
  // START POST ACTION
  // Create auth/register and retrieve the user’s form values
  app.post("/auth/account", (req, res) => { 
  const { name, email, password, password_confirm } = req.body
  
  // db.query() code goes here : retrieve the customer’s form values
  /*
  Now that you have the values query the database to check if the email is on the server. 
  That way, a user cannot register multiple times with the same email
  */
  con.query('SELECT email FROM customers WHERE email = ?', [email], async (error, res) => {
  // REPORT Query Error
  /*
  If there is an error while executing the query, access error 
  and display it on the server’s terminal:
  */
  if(error){
  console.log(error)
  }
  
  // START Check customer email no already registered
  
  // CHECK Passwords match
  /*
  Next, check if there is a result and if the two passwords are a match. 
  If any conditions are true, re-render the register page to notify the user 
  the email is already in use or that the passwords don’t match:
  */
  if( res.length > 0 ) {
  return res.render('account', {
  message: 'This email is already in use'
  })
  } else if(password !== password_confirm) {
  return res.render('account', {
  message: 'Passwords do not match!'
  })
  }
  // Check if there is a result and if the two passwords are a match. 
  /*
  If any conditions are true, re-render the register page to notify the user 
  the email is already in use or that the passwords don’t match:
  */
  let hashedPassword = await bcrypt.hash(password, 8)
  
  con.query('INSERT INTO users SET?', {fullname: fullname, email: email, password: hashedPassword}, (err, res) => {
  if(error) {
  console.log(error)
  } else {
  return res.render('account', {
  message: 'User registered!'
  })
  }
  })
  })
  })
  
  // END Check customer email no already registered
  // END POST ACTION
// END customer registration

// CRUD operations
// SELECT 5 records
con.connect(function(err) {
  if (err) throw err;
  var sql = "SELECT * FROM customers LIMIT 5";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  console.log("MySQL connected!")
});

// Display the 5 records
app.get( "/", function(req,res) {
    res.setHeader("Access-Control-Origin-Allow","*");
    res.setHeader('Content-Type','application/json');
    res.status(200);
    res.send(JSON.stringify(
        {
            id: 1,
            firstname: 'Abi',
            lastname: 'Mash',
            email: 'abi@gmail.com',
            password: '123456'
        }
    ));
});

// INSERT 1 customer record
app.post('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        id: 2,
        name: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        password_confirm: 'testpass'
      }
  ));

  var sql = "INSERT INTO customers (name, email, password, password_confirm) VALUES ?";
  var values = [
    ['test', 'test@gmail.com', 'testpass', 'testpass']
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
        name: 'test',
        email: 'test@gmail.com',
        password: 'testpass',
        password_confirm: 'testpass'
      }
  ));

  var sql = "UPDATE customers SET password = 'abcdef' WHERE id = '2'";
  var values = [
    ['test', 'test@gmail.com', , 'abcdef','abcdef']
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
        id: 2,
        name: 'test',
        email: 'test@gmail.com',
        password: 'abcdef',
        password_confirm: 'abcdef'
      }
  ));

  var sql = "DELETE FROM customers WHERE id = '2'";
  var values = [
    ['test', 'test@gmail.com', 'abcdef', 'abcdef']
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of customer records deleted: " + result.affectedRows);
  });

});

// INSERT 1 video record
app.post('/', function(req, res){

  res.setHeader("Access-Control-Origin-Allow","*");
  res.setHeader('Content-Type','application/json');
  res.status(200);
  res.send(JSON.stringify(
      {
        videoid: 4,
        customerid: 2,
        locationid: 2,
        title: 'Test video',
        videourl: ' https://github.com/myiitgit/iitDevOps/testvideo.mp4',
        comment: 'Test video',
        rating: 2,
        dateposted: '2024-01-01 09:30:00'
      }
  ));

  var sql = "INSERT INTO video (videoid, customerid, locationid, title, videourl, comment, rating, dateposted) VALUES ?";
  var values = [
    [videoid, customerid, locationid, title, videourl, comment, rating, dateposted]
  ];
  con.query(sql, [values], function (err, result) {
    if (err) throw err;
    console.log("Number of video records inserted: " + result.affectedRows);
  });

});

app.listen(port, function () {
    console.log('Server listening on port 3000!');
});