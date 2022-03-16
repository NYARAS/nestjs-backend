import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './order';
import { OrderItem } from './order-item';
import { OrderItemsService } from './order-items.service';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Order, OrderItem])
    ],

    controllers: [OrderController],
    providers: [OrderService, OrderItemsService],
})
export class OrderModule {}
