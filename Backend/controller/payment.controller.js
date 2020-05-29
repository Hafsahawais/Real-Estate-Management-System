const express = require("express");
const keys = require("./keys");
const stripe = require("stripe")(keys.stripeSecretKey);

//Index Route
module.exports = {
  PayPage: (req, res) => {
    try {
      res.send("payment page", {
        stripePublishableKey: keys.stripePublishableKey,
      });
    } catch (err) {
      res.json({ message: err });
    }
  },
};
