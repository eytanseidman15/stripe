This project demonstrates the Stripe PaymentIntents API and how to use it within a web application.

## Running the program

You need to do five things in order to get this program to work

First, from a command line you need to clone this project and it will create a folder called stripe

```git clone https://github.com/eytanseidman15/stripe.git```

Second, once you have cloned this repo you need to navigate to the directory that it has created called stripe. On a Mac that would be the following command

```cd stripe```

Next, you need to install the dependencies by executing the following from a command line:

```npm install```

You are now ready to set up the webhook to listen for events and see what is happening on the Stripe server side. After running the command you should see the Webhook state that it is listening for events

```node ./pages/api/webhook.js```

In a new MacOS terminal window you need to configure your environment variables with your Stripe Public Key and Stripe Secret Key

```export STRIPE_SECRET_KEY=sk_test_...your...key```

Finally, in that same window as the step above run the program with the following command:

```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the program

## Running through the test cases
Once you have the program up and running on [http://localhost:3000](http://localhost:3000) please go to the [Stripe Payment Intents](https://stripe.com/docs/payments/accept-a-payment) documentation and look at section for test cases to execute.

In the terminal window running the webhook you will see a log of all the events created on the server side

## Learn More
This application is build with a Next.js server, React frontend and Stripe API. To learn more about the technologies used to create this take a look at the following resouces:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React JS](https://reactjs.org/tutorial/tutorial.html) - learn about ReactJS
- [Stripe PaymentIntents](https://stripe.com/docs/payments/accept-a-payment) - learn about how to use Stripe PaymentIntents.
