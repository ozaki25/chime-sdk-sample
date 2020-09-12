import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: { name: 'chime-sample' },
  frameworkVersion: '2',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    // region: 'ap-northeast-1',
    profile: 'dev1',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: [
          'chime:CreateMeeting',
          'chime:DeleteMeeting',
          'chime:GetMeeting',
          'chime:ListMeetings',
          'chime:CreateAttendee',
          'chime:BatchCreateAttendee',
          'chime:DeleteAttendee',
          'chime:GetAttendee',
          'chime:ListAttendees',
        ],
        Resource: '*',
      },
    ],
  },
  functions: {
    hello: {
      handler: 'handler.hello',
      events: [
        {
          http: {
            method: 'get',
            path: 'hello',
          },
        },
      ],
    },
    createMeeting: {
      handler: 'handler.createMeeting',
      events: [
        {
          http: {
            method: 'post',
            path: 'meeting',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
