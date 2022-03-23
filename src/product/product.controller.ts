import { Body, CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Delete, Get, Inject, Param, Post, Put, UseGuards, UseInterceptors } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDto } from './dtos/product-create.dto';
import { ProductService } from './product.service';
import { Cache } from 'cache-manager';
@Controller()
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private eventEmitter: EventEmitter2,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ){

    }

    @UseGuards(AuthGuard)
   @Get('admin/products')
   async all(){
       return this.productService.find()
    }

    @UseGuards(AuthGuard)
    @Post('admin/products')
    async create(@Body() body: ProductCreateDto) {
       const product = await this.productService.save(body);
       await this.productService.findOne(product.id);
    //    this.eventEmitter.emit('product.created', product);
    //    this.eventEmitter.emit('product.created');

       return product

    }

    @UseGuards(AuthGuard)
    @Get('admin/products/:id')
    async get(@Param('id') id: number){
        return this.productService.findOne({id})
     }

     @UseGuards(AuthGuard)
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


      @UseGuards(AuthGuard)
     @Delete('admin/products/:id')
     async delete(
         @Param('id') id: number,
         ){
             return this.productService.delete(id);
      }

      @CacheKey('product_frontend')
      @CacheTTL(30 * 60)
      @UseInterceptors(CacheInterceptor)
      @Get('ambassador/products/frontend')
      async frontend() {
        return this.productService.find()
      }

      @Get('ambassador/products/backend')
     async backend() {

        let products = await this.cacheManager.get('products_backend')

        if (!products) {
            products = await this.productService.find();

            await this.cacheManager.set('products_backend', products, {
                ttl: 1080
            })
        }

        return products
    }
      
}
