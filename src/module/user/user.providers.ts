import { DataSource } from "typeorm";

export const UserProviders = [
    {
        provide: 'USER_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository('User'),
        inject: ['POSTGRES_DATA_SOURCE'],
    },
]