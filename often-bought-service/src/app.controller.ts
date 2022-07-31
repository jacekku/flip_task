import { Controller, Get } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { AppService } from './app.service';
import { SaleEvent } from './schema/sale-event.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @OnEvent('sale', { async: true })
  newSale(payload: SaleEvent) {
    this.appService.newSale(payload);
  }

  @Get('/top10MostBought')
  top10() {
    return this.appService.top10();
  }

  @Get()
  hello() {
    return 'hello world';
  }
}
