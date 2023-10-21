import { Injectable, BadRequestException } from '@nestjs/common';
import { CreateMovementDto } from './dto/create-movement.dto';
import { UpdateMovementDto } from './dto/update-movement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Movement } from './entities/movement.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { MovementType } from 'src/movement_types/entities/movement_type.entity';

@Injectable()
export class MovementService {
  constructor(
    @InjectRepository(Movement)
    private movementRepository: Repository<Movement>,
  ){

  }

  async create(createMovementDto: CreateMovementDto) {
    this.movementRepository.save([createMovementDto])
    return 'The Movement has been created';
  }
  
  findAll() {
    return this.movementRepository.find();
  }

  findOne(id: number) {
    return this.movementRepository.findBy({id:id});
  }

  update(id: number, updateMovementDto: UpdateMovementDto) {
    this.movementRepository.update(id, updateMovementDto)
    return `This action updates a #${id} product`;
  }
  async remove(id: number) {
    const existingProductType = await this.findOne(id);
    // Marcar como eliminado estableciendo la fecha y hora actual en cada entidad
    existingProductType.forEach(productType => {
      productType.deleted_at = new Date();
    });
    await this.movementRepository.save(existingProductType);
    return 'The Movement have been marked as deleted';
  }
  
}
