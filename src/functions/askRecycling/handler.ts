import * as Alexa from 'ask-sdk-core';
import * as ical from 'node-ical';
import { VEvent } from 'node-ical';
import { closestTo, format, isEqual, isFuture } from 'date-fns';

const AskRecyclingIntentHandler = {
  canHandle(handlerInput) {
    return (
      Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
      Alexa.getIntentName(handlerInput.requestEnvelope) === 'AskRecyclingIntent'
    );
  },

  handle(handlerInput) {
    const calendarEvents = ical.sync.parseFile(`${__dirname}/calendar.ics`);
    const realEvents = Object.values(calendarEvents)
      .filter((x) => x.type === 'VEVENT')
      .filter((x) => isFuture((x as VEvent).start));

    const realEventsWithParsedDates = realEvents.map((x) => {
      const event = x as VEvent;
      return {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    });

    const nextCollectionDate = closestTo(
      new Date(),
      realEventsWithParsedDates.map((x) => x.start),
    );

    const collectionsOnNextDate = realEventsWithParsedDates.filter((x) => isEqual(x.start, nextCollectionDate));

    const collections = collectionsOnNextDate.map((x) =>
      x.summary.replace('collection', '').replace('&', 'and').trim(),
    );

    if (collections.length > 1) {
      collections[collections.length - 1] = 'and ' + collections[collections.length - 1];
    }

    const speakOutput = `The next collection is ${collections.join(', ')} on ${format(
      nextCollectionDate,
      'EEEE do MMMM',
    ).replace('&', 'and')}`;

    console.log(`speakOutput: ${speakOutput}`);
    return handlerInput.responseBuilder.speak(speakOutput).getResponse();
  },
};

exports.main = Alexa.SkillBuilders.custom()
  .addRequestHandlers(AskRecyclingIntentHandler)
  .withCustomUserAgent('sample/hello-world/v1.2')
  .lambda();
