const functions = require("firebase-functions");
const express = require('express')
const cors = require('cors')
const stripe = require('stripe')('sk_test_51LSM75CYMVfwFlDLyPGLU6w32U5neU7wn4pmbMPYIEsCfPPV9yttW3qftYvFpazO0paK8rVjAp7RoV1BKixEgsuY00BvdksKI5')

//App config
const app = express()

//Middleware
app.use(cors())
app.use(express.json())

//API Routes
app.post('/payments/create', async (request, response) => {
    //Getting the requested total as an Int
    const total = parseInt(request.query.total)
    //Create the payment intent so that Stripe knows the correct payment comes through
    const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd"
    })
    //Returning the secret for Stripe to verify the payment
    response.status(201).send({
        clientSecret: paymentIntent.client_secret
    })
})

//Listen Command
exports.api = functions.https.onRequest(app)