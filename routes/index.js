require("dotenv").config();
var express = require("express");
var router = express.Router();
const FormData = require("form-data");
const fetch = require("node-fetch");

const { userSchema } = require("./schema");
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
    .then((body) => res.status(200).send({ status: "OK", body }))
    .catch((e) => res.status(422).send({ error: e }));
});

// get user enrollment data
router.post("/get-enrollment-data", function (req, res, next) {
  const apiKey = process.env.TYPINGDNA_API_KEY;
  const apiSecret = process.env.TYPINGDNA_API_SECRET;

  const { userId } = req.body;

  fetch(`https://api.typingdna.com/user/${userId}`, {
    method: "get",
    headers: {
      Authorization:
        "Basic " + new Buffer(apiKey + ":" + apiSecret).toString("base64"),
    },
  })
    .then((res) => res.json())
    .then((body) => res.status(200).send({ status: "OK", body }))
    .catch((e) => res.status(422).send({ error: e }));
});

/* Send user an OTP code */
router.post("/send-otp", function (req, res, next) {
  const { email } = req.body;

  const Twilio = require("twilio")(
    process.env.ACCOUNT_SID,
    process.env.ACCOUNT_TOKEN
  );

  Twilio.verify
    .services(process.env.VERIFY_SERVICE)
    .verifications.create({ to: email, channel: "email" })
    .then((verification) =>
      res.status(200).send({ status: verification.status, data: verification })
    )
    .catch((error) => res.status(422).send({ error }));
});

/* Verifies OTP code sent to user */
router.post("/verify-otp", function (req, res, next) {
  const { email, otp } = req.body;

  const Twilio = require("twilio")(
    process.env.ACCOUNT_SID,
    process.env.ACCOUNT_TOKEN
  );

  Twilio.verify
    .services(process.env.VERIFY_SERVICE)
    .verificationChecks.create({ to: email, code: otp })
    .then((verification_check) =>
      res.status(200).send({ data: verification_check })
    )
    .catch((error) => res.status(422).send({ error }));
});

// A basic endpoint to create a user in DB
// Params: { email address,  password }
// Warning: Stores data in Plain Text. Hash and Salt for better use!!!
router.post("/create-account", function (req, res, next) {
  const { email, password } = req.body;

  const user = new userSchema({ email, password });

  user
    .save()
    .then((_) => res.status(200).send({ response: "CREATED" }))
    .catch((e) => res.status(422).send({ error: e }));
});

// A basic endpoint to login a user
// Params: { email address,  password }
// Fetches plain data and compares
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  userSchema.findOne({ email }, (err, data) => {
    if (err) {
      res.status(422).send({ error: e });
    }

    // just a simple authenticator
    if (data) {
      if (data.password === password && data.email === email) {
        res.status(200).send({ message: "AUTHENTICATED", data });
      }
    } else {
      res.status(401).send({
        error: e,
        message: "Username or Password incorrect. Check details",
      });
    }
  });
});

module.exports = router;
