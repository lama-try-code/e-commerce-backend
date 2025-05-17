import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { GoogleService } from "./google.service";
import { GoogleOAuthGuard } from "src/common/guards/google-oauth.guard";

@ApiTags('google')
@Controller('google')
export class GoogleController {
    constructor(private readonly googleService: GoogleService) {

    }

    @Get()
    @UseGuards(GoogleOAuthGuard)
    async googleAuth(@Request() req) {}

    @Get('google-redirect')
    @UseGuards(GoogleOAuthGuard)
    googleAuthRedirect(@Request() req) {
        return this.googleService.googleLogin(req);
    }
}