import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Product } from "../product";
import { MailerService } from "@nestjs-modules/mailer";
import { ClientKafka } from "@nestjs/microservices";

@Injectable()
export class ProductListener {
    constructor(
        @Inject('KAFKA_SERVICE') private client: ClientKafka,
        private mailerService: MailerService
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
}