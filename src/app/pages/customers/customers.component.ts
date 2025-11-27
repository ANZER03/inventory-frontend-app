import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Customer } from '../../models/customer';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomersComponent implements OnInit {
  customers = signal<Customer[]>([]);
  showForm = signal<boolean>(false);
  isEditing = signal<boolean>(false);
  currentCustomer = signal<Customer>({ name: '', email: '' });

  isLoading = signal<boolean>(false);

  constructor(protected customerService: CustomerService) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.isLoading.set(true);
    this.customerService.getCustomers().subscribe({
      next: (value) => {
        let custs = value._embedded.customers.map((c: any) => {
          return {
            id: c._links.customer.href.split('/').slice(-1)[0],
            name: c.name,
            email: c.email
          }
        })
        this.customers.set(custs);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  deleteCustomer(c: Customer) {
    if (confirm('Are you sure you want to delete this customer?')) {
      if (c.id) {
        this.customerService.deleteCustomer(c.id).subscribe({
          next: () => {
            this.loadCustomers();
          },
          error: (err) => console.error(err)
        });
      } else {
        console.error("Customer ID is missing");
      }
    }
  }

  openCreateForm() {
    this.currentCustomer.set({ name: '', email: '' });
    this.isEditing.set(false);
    this.showForm.set(true);
  }

  openEditForm(c: Customer) {
    this.currentCustomer.set({ ...c });
    this.isEditing.set(true);
    this.showForm.set(true);
  }

  onSubmit() {
    if (this.isEditing()) {
      const c = this.currentCustomer();
      if (c.id) {
        this.customerService.updateCustomer(c.id, c).subscribe({
          next: () => {
            this.loadCustomers();
            this.showForm.set(false);
          },
          error: (err) => console.error(err)
        });
      }
    } else {
      this.customerService.saveCustomer(this.currentCustomer()).subscribe({
        next: () => {
          this.loadCustomers();
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
