import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { hash } from 'bcryptjs';
import { FilterQuery, Model, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/user-schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<User, 'password'>> {
    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: createUserDto.email,
    });

    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    try {
      const user = new this.userModel({
        ...createUserDto,
        password: await hash(createUserDto.password, 10),
      });

      const savedUser = await user.save();
      const { password, ...userResponse } = savedUser.toObject();
      return userResponse;
    } catch (error) {
      throw new BadRequestException('Failed to create user');
    }
  }

  async getUser(query: FilterQuery<User>) {
    const user = (await this.userModel.findOne(query)).toObject();

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getUsers(): Promise<User[]> {
    // Omit password from response
    return this.userModel.find({}, { password: 0 }).lean();
  }

  async updateUser(query: FilterQuery<User>, data: UpdateQuery<User>) {
    return this.userModel.findOneAndUpdate(query, data);
  }
}
