import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.totalPrice = this.cartService.calculateTotalPrice();
    });
  }

  removeFromCart(item: CartItem): void {
    this.cartService.removeFromCart(item).subscribe(() => {
      this.totalPrice = this.cartService.calculateTotalPrice();
    });
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
