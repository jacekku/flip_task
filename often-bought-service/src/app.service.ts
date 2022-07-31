import { Injectable } from '@nestjs/common';
import { Sale } from './dto/sale.dto';
import { SaleEvent } from './schema/sale-event.schema';
import { TotalBoughtService } from './total-store/total-bought.service';

@Injectable()
export class AppService {
  constructor(private readonly totalBought: TotalBoughtService) {}
  newSale(sale: SaleEvent) {
    this.totalBought.incrementTotal(sale);
  }

  top10() {
    return this.totalBought.top();
  }
}
