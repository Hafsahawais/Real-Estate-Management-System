const express = require("express");
const stripe = require("stripe")("sk_test_Ggk5p8mcL5Tv7C0uHGuty3jn00Mgc8kt8x");

module.exports = {
    Suscribe: async (req, res) => {
        const { email, payment_method } = req.body;

        const customer = await stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_settings: {
                default_payment_method: payment_method,
            },
        });

        const subscription = await stripe.subscriptions.create({
            customer: customer.id,
            items: [{ plan: "price_1GpvZtKdA9J38KHcj6x4hLef" }],
            expand: ["latest_invoice.payment_intent"],
        });

        const status = subscription["latest_invoice"]["payment_intent"]["status"];
        const client_secret =
            subscription["latest_invoice"]["payment_intent"]["client_secret"];

        res.json({ client_secret: client_secret, status: status });
    },
};
