import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterDto } from './dtos/register.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response, Request, response } from 'express';
import { PassThrough } from 'stream';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        ){

    }
    @Post('admin/register')
    async register(@Body() body: RegisterDto){
        const {password_confirm, ...data} = body;

        if(body.password !== body.password_confirm) {
            throw new BadRequestException("Passwords do not match!")
        }

        const hashed = await bcrypt.hash(body.password,12);

        return this.userService.save({
            ...data,
            password: hashed,
            is_ambassador: false
        })
    }
}