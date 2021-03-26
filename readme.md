# Express.js backend application

This backend application was boostrapped using the [Express-generator]() package, and is built to interface with the [TypingDNA Authentication API](https://www.typingdna.com/clients) for creating Mult-factor authentication for users.

## External Services Used:
 - [TypingDNA](https://www.typingdna.com/)
 - [MongoDB](https://www.mongodb.com)
 - [Twilio Verify](https://www.twilio.com/verify)

## Intallation steps 
- Clone and install dependencies locally using the `yarn install` command
- Start the application using the `yarn start` command and make HTTP requests to port `5000`

## Environment variables
  To work with the above listed external services, this application connects securely to the external services using environment variables passed from a `.env` file.

  Note: Create a `.env` file containing the following fields and the respective values;

- TypingDNA Specific: <br>
  **TYPINGDNA_API_KEY**: API key obtained from your TypingDNA Dashboard  <br>
  **TYPINGDNA_API_SECRET**: API secret value obtained from your TypingDNA Dashboard

- MongoDB Specific <br>
  **MONGO_URI** : A MongoDB connection string to connect this application to a running mongodb instance either locally or provisioned on a Atlas Cluster.

- Twilio Specific <br>
  **ACCOUNT_SID**: SID Values obtained after creating a Twilio Verify service.   <br>
  **ACCOUNT_TOKEN**: Secret Token obtained after creating a Twilio Account.