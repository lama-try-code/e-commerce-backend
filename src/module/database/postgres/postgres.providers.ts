import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';

export const postgresProvider = [
    {
        provide: 'POSTGRES_DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => {
            const dataSource = new DataSource({
                type: 'postgres',
                host: configService.get('POSTGRES_HOST'),
                port: configService.get<number>('POSTGRES_PORT'),
                username: configService.get('POSTGRES_USER'),
                password: configService.get('POSTGRES_PASSWORD'),
                database: configService.get('POSTGRES_DB'),
                synchronize: true,
                logging: true,
                entities: [__dirname + '/entities/*.entity{.ts,.js}'],
            });
            return dataSource.initialize();
        }
}
];
