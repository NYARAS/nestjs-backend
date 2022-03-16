import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from 'src/shared/abstract.service';
import { Repository } from 'typeorm';
import { Order } from './order';
import { OrderItem } from './order-item';

@Injectable()
export class OrderItemsService extends AbstractService {
    constructor(
        @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>
    ){

        super(orderItemRepository);
    }
}
