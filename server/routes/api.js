const express = require('express');
const router = new express.Router();
const data = require('../data');
const authCheck = require('../middleware/authCheck');

router.get('/ingredients', (req, res) => {
    return res.json(data)
});

router.post("/neworder", authCheck, function (req, res) {
    res.json({success: true, user: res.locals.user})
});
module.exports = router