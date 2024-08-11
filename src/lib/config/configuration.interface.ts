export interface AppConfiguration {
  nodeEnv: string;
  port: number;
  database: {
    mongodb_uri: string;
  };
}
