import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://openlibrary.org/search.json?q=programming&limit=10')
      .subscribe((data: any) => {
        this.books = data.docs;
      });
  }
}
