import express from "express";
import bodyParser from 'body-parser';
import Stripe from 'stripe';
import {STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY} from "./constants.js";

const stripePublishableKey = STRIPE_PUBLISHABLE_KEY
const stripeSecretKey = STRIPE_SECRET_KEY

const app = express();

//ensures all request has parsed json before going to next request
//parses and extract json data from request
//attaches it to the request bo
app.use((req, res,next) => {
    bodyParser.json()(req,res,next)
})


app.get('/health', (_,res) => {
    res.send('Hello World!');
})

app.post('/create-payment-intent', async(req, res) => {
    const {email, currency, amount} = req.body;
    const stripe = new Stripe(stripeSecretKey, {
        apiVersion: '2020-08-27'
    })
    const customer = await stripe.customers.create({email})
    const params = {
        amount: parseInt(amount),
        currency,
        customer: customer.id,
        payment_method_options: {
            card: {
                request_three_d_secure: 'automatic'
            }
        },
        payment_method_types: []
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create(params);
        return res.send({
            clientSecret: paymentIntent.client_secret
        })
    }
    catch(error){
        console.log(error);
        return res.send({
            error: error.raw.message
        })
    }
});


const PORT = 4242;

app.listen(PORT, () => {
    console.log("Server is running on Port", PORT)
})