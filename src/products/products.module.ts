import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]) // Añade Product a las entidades disponibles
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
