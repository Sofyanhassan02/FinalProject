import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(item: CartItem): Observable<void> {
    const currentItems = this.cartItemsSubject.getValue();
    currentItems.push(item);
    this.cartItemsSubject.next(currentItems);
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  removeFromCart(item: CartItem): Observable<void> {
    const currentItems = this.cartItemsSubject.getValue();
    const index = currentItems.indexOf(item);
    if (index > -1) {
      currentItems.splice(index, 1);
    }
    this.cartItemsSubject.next(currentItems);
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }

  calculateTotalPrice(): number {
    const currentItems = this.cartItemsSubject.getValue();
    return currentItems.reduce((total, item) => total + item.price, 0);
  }

  clearCart(): Observable<void> {
    this.cartItemsSubject.next([]);
    return new Observable<void>(observer => {
      observer.next();
      observer.complete();
    });
  }
}
