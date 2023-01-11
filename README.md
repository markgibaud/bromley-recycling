# Bromley Recycling Alexa skill

### What is this?

_"Alexa ask Bromley Recycling what week it is..."_

A simple Serverless Framework Typescript project for an Alexa skill that tells you what waste type is being collected next, and when, if you live in Bromley, UK.

Feel free use this code to provision your own Alexa skill at [Amazon Developer](https://developer.amazon.com/alexa) and once you have an `appId`:

1. Clone this repo, plug in your `appId` to the `serverless.ts` config
2. Replace `calendar.ics` with the one relevant for your postcode, available from here: https://recyclingservices.bromley.gov.uk/waste
3. Deploy this to your AWS environment and then you should be able to test in the Alexa Developer Console.
4. If your Alexa Developer email address is the same as your Alexa Consumer (Amazon.co.uk) email address, the skill should _automatically_ be available on your Alexa and found inside "your skills" in your Alexa mobile app.

### How does it work?

This MVP version works by using a bundled .ics file available from the Bromley Council website to figure out the details.

### To-do list:

1. Enable the looking up of collection details by telling Alexa your postcode (Bromley Council makes .ics available for each collection area, defined by your postcode).
