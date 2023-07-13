import configuration from 'src/constant/environment/config';
import { DataSourceOptions } from 'typeorm';

export const dataSourceOptons: DataSourceOptions = configuration().database;
