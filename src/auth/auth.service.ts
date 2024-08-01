import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import {UserDocument} from "../users/schemas/user.schema";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.usersService.findOne(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            return result;
        }
        const createdUser = await this.usersService.create({username: username, password: pass});
        const { password, ...result } = createdUser;
        return result;
    }

    async login(user: UserDocument) {
        const payload = { username: user.username, id: user._id.toString() };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}