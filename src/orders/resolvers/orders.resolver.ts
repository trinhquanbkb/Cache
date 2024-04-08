import { Resolver, Query, Args } from '@nestjs/graphql';
import { OrderDTO } from '../dto/orders.dto';
import { OrdersService } from '../services/orders.service';
import { NotFoundException } from '@nestjs/common';

@Resolver('orders')
export class OrdersResolver {
  constructor(private orderService: OrdersService) {}

  @Query(() => [OrderDTO])
  async getOrders(): Promise<OrderDTO[]> {
    try {
      const listOrders = await this.orderService.orders();
      if (!listOrders) {
        throw new NotFoundException('Not found order');
      }
      return listOrders;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  @Query(() => OrderDTO)
  async getOrderDetail(@Args('id') id: number): Promise<OrderDTO> {
    try {
      const order = await this.orderService.orderDetail(id);
      if (!order) {
        throw new NotFoundException('Not found order');
      }
      return order;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
