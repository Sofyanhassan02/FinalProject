import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CartService, CartItem } from '../cart.service';

interface Book {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  books: Book[] = [];
  selectedBook: Book | null = null;
  count: number = 1;

  constructor(private http: HttpClient, private cartService: CartService) { }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    this.http.get<any>('https://api.itbook.store/1.0/new').subscribe(response => {
      this.books = response.books.map((book: any) => ({
        id: book.isbn13,
        title: book.title,
        subtitle: book.subtitle,
        description: book.desc,
        price: parseFloat(book.price.replace('$', '')),
        image: book.image
      }));
    });
  }

  setSelectedBook(book: Book): void {
    this.selectedBook = book;
  }

  addToCart(book: Book | null): void {
    if (book) {
      for (let i = 0; i < this.count; i++) {
        this.cartService.addToCart({
          id: book.id,
          name: book.title,
          description: book.description,
          price: book.price,
          imageUrl: book.image
        }).subscribe();
      }
    }
  }

  sortBooks(event: any): void {
    const sortBy = event.target.value;
    if (sortBy === 'title') {
      this.books.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'price-asc') {
      this.books.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      this.books.sort((a, b) => b.price - a.price);
    }
  }
}

