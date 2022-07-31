import { Controller, Get } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { StatsService } from './stats.service';
import { SaleEvent } from './schema/sale-event.schema';

@Controller()
export class AppController {
  constructor(private readonly statsService: StatsService) {}

  @OnEvent('sale', { async: true })
  newSale(payload: SaleEvent) {
    this.statsService.newSale(payload);
  }

  @Get('/top10MostBought')
  top10Bought() {
    return this.statsService.top10OftenBought();
  }

  @Get('/top10MostProfitable')
  top10Profitable() {
    return this.statsService.top10MostProfitable();
  }
  @Get('/top10MostBoughtYesterday')
  top10BoughtYesterdaty() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return this.statsService.top10OftenBoughtDate(date.toLocaleDateString());
  }
}
