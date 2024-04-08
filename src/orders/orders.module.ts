import { Module } from '@nestjs/common';
import { OrdersService } from './services/orders.service';
import { OrdersResolver } from './resolvers/orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';

@Module({
  providers: [OrdersService, OrdersResolver],
  imports: [TypeOrmModule.forFeature([Orders])],
})
export class OrdersModule {}
