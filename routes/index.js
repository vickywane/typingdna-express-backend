require("dotenv").config();
var express = require("express");
var router = express.Router();
const FormData = require("form-data");
const fetch = require("node-fetch");

/* Add MFA for a user */
router.post("/add-mfa", function (req, res, next) {
  const apiKey = process.env.TYPINGDNA_API_KEY;
  const apiSecret = process.env.TYPINGDNA_API_SECRET;

  const { pattern, userId } = req.body;

  const form = new FormData();

  form.append("tp", pattern);

  fetch(`https://api.typingdna.com/auto/${userId}`, {
    method: "post",
    body: form,
    headers: {
      Authorization:
        "Basic " + new Buffer(apiKey + ":" + apiSecret).toString("base64"),
    },
  })
    .then((res) => res.json())
    .then((body) =>  res.status(200).send({ status: "OK" , body}) )
    .catch((e) => res.status(422).send({ error: e}));
  
});

module.exports = router;
