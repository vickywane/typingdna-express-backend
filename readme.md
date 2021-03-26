# Express.js backend application

This backend application boostrapped using the [Express-generator]() package is built to interface with the TypingDNA Authentication API for creating Mult-factor authentication with users.

## Services Used
 - [TypingDNA](https://www.typingdna.com/)
 - [MongoDB](https://www.mongodb.com)
 - [Twilio Verify](https://www.twilio.com/verify)

## Intallation steps 
- Clone and install dependencies locally using the `yarn install` command
- Start the application serve using `yarn start` and make HTTP requests to port `5000`

## Environment variables

- TypingDNA Specific: <br>
  **TYPINGDNA_API_KEY**: API key obtained from your TypingDNA Dashboard
  **TYPINGDNA_API_SECRET**: API secret value obtained from your TypingDNA Dashboard

- MongoDB Specific <br>
  **MONGO_URI** : A MongoDB connection string to connect this application to a running mongodb instance.

- Twilio Specific <br>
  **ACCOUNT_SID**: SID Values obtained after creating a Twilio Verify service. 
  **ACCOUNT_TOKEN**: Secret Token obtained after creating a Twilio Account.