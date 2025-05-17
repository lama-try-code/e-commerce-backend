import { Injectable } from "@nestjs/common";

@Injectable()
export class GoogleService {
    googleLogin(req) {
        if(!req.user) {
            return 'No user from google';
        }
        return {
            messgae:'User information from google',
            user: req.user
        }
    }
}