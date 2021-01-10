var express = require('express')
const bodyParser = require('body-parser');
var cors = require('cors')
var app = express()
var dotenv = require('dotenv');
const db = require('./queries')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

var stripe = require("stripe")('sk_test_QcrZXV6xdnwemPwz7MAiHhTB00BjTuOipb');

app.get('/products/', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
})

app.post('/process_payment', function(req,res){
    console.log("BODY: ", req.body);
    console.log("el token es ",req.body.token_id);
    console.log("el precio total es ",req.body.price)
    console.log("el email es ",req.body.email)
    stripe.customers.create({
      email: req.body.email,
      card: req.body.token_id
    })
    .then(customer => 
      stripe.charges.create({
      amount: Math.floor(req.body.price), // Amount in cents
      currency:"usd",
      description:"transacsion exitosa",
      customer: customer.id
    }))
    .then(charge => res.send(charge))
    .catch(err => {
      console.log("Error: ", err);
      res.status(500).send({error: "purchase failed"});
    });
  });

app.get('/api/v1/tikects/all',db.getTickets)
app.get('/api/v1/tickets/:id',db.getTicketById)
app.post('/api/v1/tickets',db.createTicket)
app.delete('/api/v1/tickets/:id',db.deleteTicket)
app.put('/api/v1/tickets/:id',db.updateTicket)


app.get('/api/v1/client/all',db.getClients)
app.get('/api/v1/clientByid/:id',db.getClientById)
app.get('/api/v1/client/:id',db.getClientAndHisTickets)
app.post('/api/v1/client',db.createClient)



app.listen(8000, function () {
    console.log('CORS-enabled web server listening on port 8000')
})
