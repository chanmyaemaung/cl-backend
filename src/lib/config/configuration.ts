import { AppConfiguration } from '@/lib/config';

export const configuration = (): AppConfiguration => ({
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    mongodb_uri: process.env.MONGODB_URI,
  },
});
