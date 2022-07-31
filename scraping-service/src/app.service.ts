import { Body, Injectable } from '@nestjs/common';
import { EventStoreProducer } from './event-store/producer.service';
import { SaleEvent } from './schema/sale-event.schema';
import fetch from 'cross-fetch';
import { Sale } from './dto/sale.dto';

@Injectable()
export class AppService {
  private readonly limit = 1;
  private readonly url = `https://recruitment-api.dev.flipfit.io/orders?_page=$PAGE&_limit=${this.limit}`;

  constructor(private readonly producerService: EventStoreProducer) {}
  async newEvent(sale: SaleEvent) {
    return this.producerService.produce(sale);
  }

  async newEvents(sales: SaleEvent[]) {
    sales.forEach((sale) => this.newEvent(sale));
  }

  getSales(constraints: { pageMin: number; pageMax: number }) {
    for (let page = constraints.pageMin; page < constraints.pageMax; page++) {
      const pageUrl = this.url.replace('$PAGE', page.toString());
      fetch(pageUrl)
        .then((res) => res.json())
        .then((res) => this.mapToSaleEvents(res[0]))
        .then((res) => this.newEvents(res))
        .catch((e) => {
          console.error('something went wrong with page ' + page + e);
        });
    }
  }

  getAllSales() {
    console.log('getting all sales');
    fetch('https://recruitment-api.dev.flipfit.io/orders')
      .then((res) => res.json())
      .then((res) =>
        res.map((element) => {
          return this.mapToSaleEvents(element);
        }),
      )
      .then((sales: any[]) => sales.flat(2))
      .then((res) => this.newEvents(res));
  }

  mapToSaleEvents(sale: Sale) {
    const mappedItems: SaleEvent[] = sale.items.map((item) => {
      const mapped: SaleEvent = {
        date: new Date(sale.date),
        name: item.product.name,
        price: Number.parseFloat(item.product.price),
        productId: item.product.id,
        quantity: item.quantity,
        saleId: sale.id,
      };
      return mapped;
    });
    return mappedItems;
  }
}
