import { product } from "./product";
import { Customer } from "./customer";

export interface ProductItem {
    id: number;
    productId: number;
    quantity: number;
    price: number;
    product: product;
}

export interface Bill {
    id: number;
    customerId: number;
    billingDate: string;
    productItems: ProductItem[];
    customer: Customer;
}
