import { DataSourceOptions } from 'typeorm';

export interface Config {
  database: DataSourceOptions;
}

const configuration = (): Config => ({
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || 'localhost',
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || '',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrations: ['dist/migrations/*.js'],
    synchronize: process.env.SYNCHRONIZE === 'true' ? true : false,
    logging: true,
  },
});

export default configuration;
