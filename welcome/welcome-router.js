const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.statusCode(200).json({
        message: `Welcome  ${process.env.NODEAPI3}`
    })

})

module.exports = router