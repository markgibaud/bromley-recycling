import * as ical from 'node-ical';
import { VEvent } from 'node-ical';
import { closestTo, isFuture, isEqual, format } from 'date-fns';

export const handle = () => {
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

  const collections = collectionsOnNextDate.map((x) => x.summary.replace('collection', '').replace('&', 'and').trim());

  if (collections.length > 1) {
    collections[collections.length - 1] = 'and ' + collections[collections.length - 1];
  }

  const speakOutput = `The next collection is ${collections.join(', ')} on ${format(
    nextCollectionDate,
    'EEEE do MMMM',
  )}`;

  console.log(`speakOutput: ${speakOutput}`);
};

describe('works', () => {
  test('should run', () => {
    handle();
  });
});
