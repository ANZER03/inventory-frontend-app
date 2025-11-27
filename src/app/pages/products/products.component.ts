import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { product } from '../../models/product';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products = signal<product[]>([]);
  showForm = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  currentProduct = signal<product>({ name: '', price: 0, quantity: 0 });

  isLoading = signal<boolean>(false);

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.productService.getProducts().subscribe({
      next: (value) => {
        let pros = value._embedded.products.map((p: any) => {
          return {
            id: p._links.product.href.split('/').slice(-1)[0],
            name: p.name,
            price: p.price,
            quantity: p.quantity
          }
        })

        this.products.set(pros);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  deleteProduct(p: product) {
    if (confirm('Are you sure you want to delete this product?')) {
      if (p.id) {
        this.productService.deleteProduct(p.id).subscribe({
          next: () => {
            this.loadProducts();
          },
          error: (err) => console.error(err)
        });
      } else {
        console.error("Product ID is missing");
      }
    }
  }

  openCreateForm() {
    this.currentProduct.set({ name: '', price: 0, quantity: 0 });
    this.isEditing.set(false);
    this.showForm.set(true);
  }

  openEditForm(p: product) {
    this.currentProduct.set({ ...p });
    this.isEditing.set(true);
    this.showForm.set(true);
  }

  onSubmit() {
    if (this.isEditing()) {
      const p = this.currentProduct();
      if (p.id) {
        this.productService.updateProduct(p.id, p).subscribe({
          next: () => {
            this.loadProducts();
            this.showForm.set(false);
          },
          error: (err) => console.error(err)
        });
      }
    } else {
      this.productService.saveProduct(this.currentProduct()).subscribe({
        next: () => {
          this.loadProducts();
          this.showForm.set(false);
        },
        error: (err) => console.error(err)
      });
    }
  }

  cancel() {
    this.showForm.set(false);
  }
}
