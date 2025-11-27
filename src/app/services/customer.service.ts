import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<any> {
    return this.http.get('http://localhost:8888/CUSTOMER-SERVICE/customers');
  }

  public saveCustomer(customer: any): Observable<any> {
    return this.http.post('http://localhost:8888/CUSTOMER-SERVICE/customers', customer);
  }

  public updateCustomer(id: number, customer: any): Observable<any> {
    return this.http.put(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`, customer);
  }

  public deleteCustomer(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8888/CUSTOMER-SERVICE/customers/${id}`);
  }
}
