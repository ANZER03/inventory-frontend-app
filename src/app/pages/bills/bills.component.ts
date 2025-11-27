import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { Bill } from '../../models/bill';

@Component({
  selector: 'app-bills',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bills.component.html',
  styleUrl: './bills.component.css'
})
export class BillsComponent {
  billId = signal<number | null>(null);
  bill = signal<Bill | null>(null);
  errorMessage = signal<string>('');

  isLoading = signal<boolean>(false);

  constructor(private billService: BillService) { }

  searchBill() {
    const id = this.billId();
    if (id) {
      this.isLoading.set(true);
      this.bill.set(null);
      this.errorMessage.set('');

      this.billService.getBill(id).subscribe({
        next: (data) => {
          this.bill.set(data);
          this.errorMessage.set('');
          this.isLoading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.bill.set(null);
          this.errorMessage.set('Bill not found or error fetching bill details.');
          this.isLoading.set(false);
        }
      });
    }
  }

  getTotal(): number {
    const b = this.bill();
    if (!b || !b.productItems) return 0;
    return b.productItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  }
}
