This project creates a fictious site that sells Masks using Stripe Payment Intents API. Those masks help slow the spread of Covid 19.

## Running the program

You need to do four things in order to get the application to load

First, from a command line you need to clone this project and it will create a folder called stripe

```git clone https://github.com/eytanseidman15/stripe.git```

Second, once you have cloned this repo you need to navigate to the directory that it has created called stripe. On a Mac that would be the following command

```cd stripe```

Third, you need to install the dependencies by executing the following from a command line:

```npm install```

Finally, in that same window as the step above run the program with the following command:

```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the program

## A customer log of successful orders
You can set up a customer log that will record all orders for you. To do so you will need to forward events to a webhook - that requires the [Stripe CLI] (https://stripe.com/docs/stripe-cli). You will need a new terminal window for *each* of the next two commands but execute them within the same directory where you installed the files.

```node ./pages/api/webhook.js```

```stripe listen --forward-to localhost:4040/webhook```


## Running through the test cases
Once you have the program up and running on [http://localhost:3000](http://localhost:3000) please go to the [Stripe Payment Intents](https://stripe.com/docs/payments/accept-a-payment) documentation and look at section for test cases to execute.

In the terminal window running the webhook you will see a log of all the events created on the server side

## Learn More
This application is build with a Next.js server, React frontend and Stripe API. To learn more about the technologies used to create this take a look at the following resouces:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [React JS](https://reactjs.org/tutorial/tutorial.html) - learn about ReactJS
- [Stripe PaymentIntents](https://stripe.com/docs/payments/accept-a-payment) - learn about how to use Stripe PaymentIntents.
- [Stripe CLI](https://stripe.com/docs/stripe-cli) - download the Stripe Command Line Interface
