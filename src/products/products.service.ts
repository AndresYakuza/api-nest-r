import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { ProductType } from 'src/product-types/entities/product-type.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private productoRepository: Repository<Product>,
  ){}

  create(createProductDto: CreateProductDto) {
    this.productoRepository.save([createProductDto])
    return 'The Product has been created';
  }
  
  findAll() {
    return this.productoRepository.find()
  }

  findBy(id: number) {
    return this.productoRepository.findBy({id:id})
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.productoRepository.update(id, updateProductDto)
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const existingProductType = await this.findBy(id);
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.productoRepository.save(existingProductType);
    return 'The Product have been marked as deleted';
  }

}
