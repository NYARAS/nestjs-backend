import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductListener } from './listeners/order.listener';
import { Product } from './product';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),

    MailerModule.forRoot({
      transport: {
        host: "docker.for.mac.localhost",
        port: 1025,
      },
      defaults: {
        from: "no-reply@example.com"
      }
    }),

    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: [""],
            ssl: true,
            sasl: {
              mechanism: "plain",
              username: "",
              password: ""
            }
          },
        }
      }
    ])
  ],
  providers: [ProductService, ProductListener],
  controllers: [ProductController],
  exports: [ProductService]
})
export class ProductModule {}
