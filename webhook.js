// This example uses Express to receive webhooks
const app = require('express')();
const port = 4040

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

//Setup the app to listen on that port
app.listen(port, () => console.log(`Listening to Stripe server events at http://localhost:${port} and will log them here`))

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      console.log("payment intent created");
      console.log({paymentIntent});
      break;
    case 'payment_intent.succeeded':
      console.log("payment intent succeeded");
      break;
    case 'payment_method.attached':
      console.log("payment method provided");
      const paymentMethod = event.data.object;
      break;
    case 'charge.succeeded':
      console.log("charge was successful");
      const chargeSuccess = event.data.object;
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});