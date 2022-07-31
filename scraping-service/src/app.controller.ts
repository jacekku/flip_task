import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppService } from './app.service';
import { SaleEvent } from './schema/sale-event.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/newEvent')
  newEvent(@Body() sale: SaleEvent) {
    return this.appService.newEvent(sale);
  }

  @Post('/getSales')
  getSales(@Body() constraints: { pageMin: number; pageMax: number }) {
    return this.appService.getSales(constraints);
  }
  @Post('/getAllSales')
  getAllSales() {
    return this.appService.getAllSales();
  }
}
