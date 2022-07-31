import { Injectable } from '@nestjs/common';
import { SaleEvent } from './schema/sale-event.schema';
import { TotalBoughtDate } from './schema/total-bought-date.schema';
import { TotalBoughtDateService } from './total-store/total-bought-date.service';
import { TotalBoughtService } from './total-store/total-bought.service';
import { TotalProfitableService } from './total-store/total-profitable.service';

@Injectable()
export class StatsService {
  constructor(
    private readonly totalBought: TotalBoughtService,
    private readonly totalProfitable: TotalProfitableService,
    private readonly totalBoughtDate: TotalBoughtDateService,
  ) {}
  newSale(sale: SaleEvent) {
    this.totalBought.incrementTotal(sale);
    this.totalProfitable.incrementTotal(sale);
    this.totalBoughtDate.incrementTotal(sale);
  }

  top10OftenBought() {
    return this.totalBought.top();
  }
  top10OftenBoughtDate(day: string) {
    return this.totalBoughtDate.top(day);
  }

  top10MostProfitable() {
    return this.totalProfitable.top();
  }
}
