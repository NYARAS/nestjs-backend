import { ClassSerializerInterceptor, Controller, Get, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UserService } from './user.service';
import {Response} from "express";
import { RedisService } from '../shared/redis.service';

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
    constructor(
        private readonly userService: UserService,
        private redisService: RedisService,
        ){

    }

    @Get('admin/ambassadors')
    async ambassadors() {
        return this.userService.find({
            is_ambassador: true
        });
    }

    @Get('ambassadors/rankings')
    async rankings(
        @Res() response: Response
    ) {
        const client = this.redisService.getClient();
        client.zrevrangebyscore('rankings', '+inf', '-inf', 'withscores', (err, result) => {
        response.send(result)
        });
    }
}
