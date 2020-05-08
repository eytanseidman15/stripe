// This uses Express to receive webhooks
const app = require('express')();
const port = 4040

//Setup the app to listen on that port
app.listen(port, () => console.log(`Listening at http://localhost:${port}`));

// Use body-parser to retrieve the raw body as a buffer
const bodyParser = require('body-parser');

//For printing dates
const dateformat = require('dateformat');

//Give the user instructions
console.log("The following orders need to be filled:");

// Match the raw body to content type application/json
app.post('/webhook', bodyParser.raw({type: 'application/json'}), (request, response) => {
  let event;

  try {
    event = JSON.parse(request.body);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
  }

  //Setup variables for printing date nicely
  let now = new Date();
  const formattedDate = dateformat(now,'fullDate')
  
  // Handle the event
  switch (event.type) {
    case 'payment_intent.created':
      const paymentIntent = event.data.object;
      //console.log("✅ payment intent created: ", event.id, " for ", paymentIntent.amount);
      break;
    case 'payment_intent.succeeded':
      const paymentIntentSuccess = event.data.object;
      //console.log("✅ payment intent succeeded", event.id, " for ", paymentIntentSuccess.amount);
      break;
    case 'payment_method.attached':
      const paymentMethod = event.data.object;
      //console.log("✅ payment method provided", event.id);
      break;
    case 'charge.succeeded':
      
      //Log the charge
      const chargeSuccess = event.data.object;
      console.log("💵 Customer Details:", chargeSuccess.receipt_email, "with last 4 of:", chargeSuccess.payment_method_details.card.last4, " paid $",(chargeSuccess.amount/100), " for ", chargeSuccess.description, "on", formattedDate);
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return response.status(400).end();
  }

  // Return a response to acknowledge receipt of the event
  response.json({received: true});
});
