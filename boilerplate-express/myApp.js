require('dotenv').config();
let express = require('express');
let bodyParser = require('body-parser');
let app = express();



app.use('/public', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// index page (static HTML) for FCC testing purposes      
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/json", logger,(req, res) => {
    let uppercase = process.env.MESSAGE_STYLE;
    if(uppercase === 'uppercase'){
      res.json({"message":"HELLO JSON"});
    } else{
        res.json({"message":"Hello json"});
    }
    
});

function logger(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
}

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
    let word = req.params.word;
    res.json({echo: word});
})

app.get("/name", (req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    res.json({"name": `${firstName} ${lastName}`})
})

app.post("/name", (req, res) =>{ 
    let firstName = req.body.first;
    let lastName = req.body.last;
    res.json({"name": `${firstName} ${lastName}`})
})

























 module.exports = app;
