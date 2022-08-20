
const express = require('express');

const router = express.Router();

const User = require('../models/user.model');

router.get("", async (req, res) => {
    try {
        if (req.query.username) {
            const items = await User.findOne({ email: req.query.email }).lean().exec();
            return res.status(200).send(items);
        }
        else {
            const user = await User.find().lean().exec();

            return res.status(201).send(user);
        }
    }
    catch (e) {
        return res.status(500).send(e.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id).lean().exec();
        res.status(201).send(user);
    }
    catch (er) {
        return res.status(500).send(er.message);
    }
});

router.patch("/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new:true
        })
        res.status(201).send(user);
    }
    catch (er) {
        return res.status(500).send(er.message);
    }
});

module.exports = router;