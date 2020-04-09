const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var logger = require('logger').createLogger('development.log');

if (process.env.NODE_ENV !== 'production') require('dotenv').config();

logger.info(process.env.STRIPE_SECRET_KEY)
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// const configureRoutes = require('./routes');

// configureRoutes(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});


app.post('/api/payment', ( req, res ) => {
  const body = {
    source: req.body.token.id,
    amount: req.body.amount,
    currency: 'usd'
  }

  stripe.charges.create(body, (stripeErr, stripeRes)=> {
    if ( stripeErr ) {
      logger.info(stripeErr);
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  })
});