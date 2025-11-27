import { Routes } from '@angular/router';
import {ProductsComponent} from './pages/products/products.component';
import {CustomersComponent} from './pages/customers/customers.component';
import {BillsComponent} from './pages/bills/bills.component';

export const routes: Routes = [
  {path : "products" , component : ProductsComponent},
  {path : "customers" , component : CustomersComponent},
  {path : "bills" , component : BillsComponent}
];
