import { CACHE_MANAGER, Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Product } from "../product";
import { MailerService } from "@nestjs-modules/mailer";
import { ClientKafka } from "@nestjs/microservices";
import { Cache } from 'cache-manager';

@Injectable()
export class ProductListener {
    constructor(
        @Inject('KAFKA_SERVICE') private client: ClientKafka,
        private mailerService: MailerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){

    }

    @OnEvent('product.created')
    async handleUserCreate(product: Product) {

        await this.client.emit('default', JSON.stringify(product));

        // await this.mailerService.sendMail({
        //     to: 'admin@admin.com',
        //     subject: "A product has been created",
        //     html: `Product #${product.id} with a name of has been created!`
        // })
    }

    @OnEvent('product_updated')
    async handleProductUpdatedEvent(product: Product) {

        await this.cacheManager.del('products_frontend');
        await this.cacheManager.del('products_backend');
    }
}