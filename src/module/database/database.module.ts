import { Module } from "@nestjs/common";
import { postgresProvider } from "./postgres/postgres.providers";
import { mongoProvider } from "./mongo/mongo.providers";

@Module({
    providers: [...postgresProvider, ...mongoProvider],
    exports: [...postgresProvider, ...mongoProvider],
})
export class DatabaseModule {}