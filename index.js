const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = 3000;

function middleware1(req, res, next) {
  console.log("from inside middleware " + req.query.counter);
  if (1) {
    next(); //allows control to pass to the next stack
  } else {
    res.send("Error from inside middleware");
  }
}
app.use(middleware1);

app.use(bodyParser.json()); //middleware

function sum(counter) {
  var sum = 0;
  for (var i = 0; i <= counter; i++) {
    sum = sum + i;
  }
  return sum;
}

function mul(counter) {
  var ans = 1;
  for (var i = 1; i <= counter; i++) {
    ans = ans * i;
  }
  return ans;
}
// query param
function qhandleFirstRequest(req, res) {
  var counter = req.query.counter;
  var caclulatedSum = sum(counter);
  var answer = "the sum is " + caclulatedSum;
  // res.send(answer);
  var answerObject = {
    sum: caclulatedSum,
  };
  res.status(200).send(answerObject);
  // res.status(401).send(answer); //example status
  // } else {
  //   res.status(411).send("very large value");
  // }
}

// headers
function hhandleFirstRequest(req, res) {
  console.log(req.headers);
  var counter = req.headers.counter;
  var caclulatedSum = sum(counter);
  var answer = "the sum is " + caclulatedSum;
  res.send(answer);
}

//body - wont work without bodyparser middleware
function handleFirstRequest(req, res) {
  console.log(req.body);
  var counter = req.body.counter;
  var caclulatedSum = sum(counter);
  var caclulatedMul = mul(counter);
  var answerObject = {
    sum: caclulatedSum,
    mul: caclulatedMul,
  };
  res.status(200).send(answerObject);
}

// function getPage(req, res) {
//   res.send(`<head>
//     <title>Document</title>
// </head>
// <body>
//     <b>
//         hi
//     </b>
// </body>
// `);
// }

function getPage(req, res) {
  res.sendFile(__dirname + "/index.html");
}

app.get("/handle", handleFirstRequest);
app.get("/handle2", handleFirstRequest);
app.get("/handleSum", qhandleFirstRequest);
app.get("/", getPage);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
