import { DataSource } from "typeorm";

export const ProductProviders = [
    {
        provide: 'PRODUCT_REPOSITORY',
        useFactory: (datasource: DataSource) => datasource.getRepository('Product'),
        inject: ['POSTGRES_DATA_SOURCE'],
    }
]