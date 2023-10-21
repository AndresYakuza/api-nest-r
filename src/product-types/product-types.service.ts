import { Injectable, ConflictException } from '@nestjs/common';
import { CreateProductTypeDto } from './dto/create-product-type.dto';
import { UpdateProductTypeDto } from './dto/update-product-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductType } from './entities/product-type.entity';
import { Repository } from 'typeorm';


@Injectable()
export class ProductTypesService {

  constructor(
    @InjectRepository(ProductType)
    private productoRepository: Repository<ProductType>,
  ){

  }
  create(createProductTypeDto: CreateProductTypeDto) {
    this.productoRepository.save([createProductTypeDto])
    return 'The Product Type has been created';
  }

  findAll() {
    return this.productoRepository.find();
  }

  findBy(id: number) {
    return this.productoRepository.findBy({id:id})
  }

  update(id: number, updateProductTypeDto: UpdateProductTypeDto) {
    this.productoRepository.update(id, updateProductTypeDto)
    return 'The Product Type has been updated'
  }

  async remove(id: number) {
    const existingProductType = await this.findBy(id);
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.productoRepository.save(existingProductType);
    return 'The Product Types have been marked as deleted';
  }
  
  
}
