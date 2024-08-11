export interface AppConfiguration {
  nodeEnv: string;
  port: number;
  database: {
    host: string;
    port: number;
  };
}
