import { Module } from "@nestjs/common";
import { GoogleStrategy } from "./google.strategy";
import { GoogleService } from "./google.service";
import { GoogleController } from "./google.controller";

@Module({
    controllers:[GoogleController],
    providers: [GoogleStrategy, GoogleService],
})
export class GoogleModule {}