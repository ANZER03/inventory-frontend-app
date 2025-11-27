import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get('http://localhost:8888/INVENTORY-SERVICE/products');
  }

  public saveProduct(product: any): Observable<any> {
    return this.http.post('http://localhost:8888/INVENTORY-SERVICE/products', product);
  }

  public updateProduct(id: number, product: any): Observable<any> {
    return this.http.put(`http://localhost:8888/INVENTORY-SERVICE/products/${id}`, product);
  }

  public deleteProduct(id: number): Observable<any> {
    return this.http.delete(`http://localhost:8888/INVENTORY-SERVICE/products/${id}`);
  }
}
