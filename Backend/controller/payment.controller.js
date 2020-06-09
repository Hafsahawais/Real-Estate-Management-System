const express = require("express");
const stripe = require("stripe")("sk_test_Ggk5p8mcL5Tv7C0uHGuty3jn00Mgc8kt8x");
module.exports = {

  // oneTimePayment: async (req, res) => {
  //   const { email } = req.body;
  //   console.log(email);
  //
  //   const paymentIntent = await stripe.paymentIntents.create({
  //     amount: req.body.amount,
  //     currency: "usd",
  //     // Verify your integration in this guide by including this parameter
  //     metadata: { integration_check: "accept_a_payment" },
  //     receipt_email: email,
  //   });
  //
  //   res.json({ client_secret: paymentIntent["client_secret"] });
  // },
  makePayment: async (req,res) =>
  {
    console.log(req.body)
    const stripeToken = req.body.stripeToken;
    const price = req.body.amount;
    const priceInPence = price * 100;
    stripe.charges.create({
      amount: priceInPence,
      currency: 'usd',
      source: stripeToken,
      capture: false,  // note that capture: false
    }).then(response => {
      // do something in success here
      res.status(200).send(response)
    }).catch(error => {
      // do something in error here
      res.status(400).send(error)
    });
  }

}
