import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Orders } from '../entities/order.entity';
import { Cache } from 'cache-manager';
import { OrderDTO } from '../dto/orders.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Orders)
    private ordersRepo: Repository<Orders>,
    @Inject('CACHE_MANAGER')
    private cacheManager: Cache,
  ) {}

  async orders() {
    const cachedOrders: OrderDTO[] = await this.cacheManager.get('orders');
    if (cachedOrders) {
      console.log('cache had data');
      return cachedOrders;
    }
    const orders = await this.ordersRepo.find();
    await this.cacheManager.set('orders', orders);
    return orders;
  }

  async orderDetail(id: number) {
    return await this.ordersRepo.findOne({ where: { id } });
  }
}
