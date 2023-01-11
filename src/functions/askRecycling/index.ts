import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  memorySize: 512,
  events: [
    {
      alexaSkill: {
        appId: 'amzn1.ask.skill.b020e360-3ebd-4630-8364-a92021066838',
      },
    },
  ],
};
