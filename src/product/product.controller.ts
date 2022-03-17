import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private eventEmitter: EventEmitter2
    ){

    }

   @Get('admin/products')
   async all(){
       return this.productService.find()
    }

    @Post('admin/products')
    async create(@Body() body: ProductCreateDto) {
       const product = await this.productService.save(body);
       await this.productService.findOne(product.id);
    //    this.eventEmitter.emit('product.created', product);
    //    this.eventEmitter.emit('product.created');

       return product

    }

    @Get('admin/products/:id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id})
     }

     @Put('admin/products/:id')
     async update(
         @Param('id') id: number,
         @Body() body: ProductCreateDto,
         ){
             // Update the product
             await this.productService.update(id, body);

             // Find the just updated product
             const product = await this.productService.findOne({id});
            //  this.eventEmitter.emit('product.created', product);

            return product
      }


     @Delete('admin/products/:id')
     async delete(
         @Param('id') id: number,
         ){
             return this.productService.delete(id);
      }
}
