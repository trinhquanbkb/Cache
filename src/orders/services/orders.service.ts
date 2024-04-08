import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepo: Repository<Orders>,
  ) {}

  async orders() {
    return await this.ordersRepo.find();
  }

  async orderDetail(id: number) {
    return await this.ordersRepo.findOne({ where: { id } });
  }
}
