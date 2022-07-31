// Generated by https://quicktype.io

export interface Sale {
  id: string;
  date: string;
  customer: Customer;
  items: Item[];
}

export interface Customer {
  id: string;
  name: string;
}

export interface Item {
  product: Product;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: string;
}