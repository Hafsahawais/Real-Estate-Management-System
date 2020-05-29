const express = require("express");
const keys = require("./keys");
const stripe = require("stripe")(keys.stripeSecretKey);


//Index Route
module.exports = {
  ChargePayment: (req, res) => {
    try {
      const amount = 2500;
      console.log("yo");
      stripe.customers
        .create({
          email: req.body.stripeEmaill,
          source: req.body.stripeToken,
        })
        .then((customer) =>
          stripe.charges.create({
            amount,
            description: "REAL ESTATE PAYMENT",
            currency: "usd",
            customer: customer.id,
          })
        )
        .then((charge) => res.send("success"));
    } catch (err) {
      res.json({ message: err });
    }
  },
};
