import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from '../cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  name: string = '';
  address: string = '';
  paymentDetails: string = '';
  couponCode: string = '';
  discount: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    this.totalPrice = this.cartService.calculateTotalPrice() - this.discount;
  }

  applyCoupon(): void {
    if (this.couponCode === 'SKHALED20') {
      this.discount = 20;
      alert('Coupon applied! $20 discount.');
    } else {
      this.discount = 0;
      alert('Invalid coupon code.');
    }
    this.calculateTotalPrice();
  }

  onSubmit(): void {
    if (this.name && this.address && this.paymentDetails) {
      alert('Order placed successfully!');
      this.cartService.clearCart();
    } else {
      alert('Please fill in all fields.');
    }
  }
}
