import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(protected customerService: CustomerService) { }
}
