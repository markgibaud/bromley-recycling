import type { AWS } from '@serverless/typescript';

import askRecycling from '@functions/askRecycling';

const serverlessConfiguration: AWS = {
  service: 'bromley-recycling',
  frameworkVersion: '3',
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    askRecycling,
  },
  package: {
    individually: true,
    include: ['./src/functions/askRecycling/calendar.ics'],
  },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  outputs: {
    AskRecyclingArn: {
      'Fn::GetAtt': [askRecycling, 'Arn'],
    },
  },
};

module.exports = serverlessConfiguration;
