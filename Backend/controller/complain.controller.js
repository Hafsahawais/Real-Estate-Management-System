const express = require("express");
const complainRouter = express.Router();
const Complain = require("../models/complain");


module.exports = {
    AllComplainList: async (req, res) => {
        try {
            const complains = await Complain.find();
            res.json(complains);
        } catch (err) {
            res.json({ message: err });
        }
    },
    AddComplain: async (req, res) => {
        const complain = new Complain({
            title: req.body.title,
            type : req.body.type,
            description: req.body.description
        });

        try {
            const savedComplain = await complain.save();
            res.json(savedComplain);
        } catch (err) {
            res.json({ message: err });
        }
    },
    findOneComplain: async (req, res) => {
        try {
            const complain = await Complain.findById(req.params.complainId);
            res.json(complain);
        } catch (err) {
            res.json({ message: err });
        }
    },
    deleteComplain: async (req, res) => {
        try {
            const removedComplain = Complain.remove({ _id: req.params.complainId });
            res.json(removedComplain);
        } catch (err) {
            res.json({ message: err });
        }
    },

    updateComplain: async (req, res) => {
        try {
            const updatedComplain = await Complain.updateOne(
                { _id: req.params.complainId },
                { $set: { title: req.body.title },
                }
            );
            res.json(updatedComplain);
        } catch (err) {
            res.json({ message: err });
        }
    },
};
