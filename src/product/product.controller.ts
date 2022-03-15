import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService
    ){

    }

   @Get('admin/products')
   async all(){
       return this.productService.find({})
    }

    @Post('admin/products')
    async create(@Body() body: ProductService) {
        return this.productService.save(body);
    }

    @Get('admin/products/:id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id})
     }
}
