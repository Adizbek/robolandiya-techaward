import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {User} from './schemas/user.schema';
import {Model} from "mongoose";
import {CreateUserDto} from "./dto/create-user.dto";

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save()
    }

    async findOne(username: string): Promise<User> {
        return this.userModel.findOne({username}).lean();
    }

    async findAll(): Promise<User[]> {
        return this.userModel.find({}, "-password").lean();
    }

    async updateCoins(username: string, coins: number): Promise<User> {

    }
}