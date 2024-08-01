import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {InjectModel} from "@nestjs/mongoose";
import {User} from "./schemas/user.schema";
import {UsersService} from "./users.service";


@Controller('users')
export class UsersController {

    constructor(private readonly userService: UsersService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get("/profile")
    async getProfile(@Request() req) {
        const {username, userId} = req.user;
        const {password, ...result} = await this.userService.findOne(username)
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Get("/all")
    async getAllUsers(@Request() req) {
        return await this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get("/user/coins")
    async getUserCoins(@Request() req) {
        const {username} = req.user;
        const {coins} = await this.userService.findOne(username)
        return coins;
    }

    @UseGuards(JwtAuthGuard)
    @Post("/user/coins/:coins")
    async addUserCoins(@Request() req) {
        const {username} = req.user;
        const {coins} = await this.userService.findOne(username)
        const newCoins = coins + parseInt(req.params.coins);
        await this.userService.updateCoins(username, newCoins);
        return {coins: newCoins};
    }
}
