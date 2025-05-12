import { ConfigService } from "@nestjs/config";
import { connect, Connection } from "mongoose";

export const mongoProvider = [
    {
        provide: 'MONGO_DATA_SOURCE',
        inject: [ConfigService],
        useFactory: async (configService: ConfigService): Promise<Connection> => {
            const uri = configService.get<string>('MONGO_URI');
            if(!uri) {
                throw new Error('connection failed, MONGO_URI is not defined');
            }
            const conn = await connect(uri);
            return conn.connection;
        },
    }
];