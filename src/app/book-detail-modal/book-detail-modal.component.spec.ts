import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-book-detail-modal',
  templateUrl: './book-detail-modal.component.html',
  styleUrls: ['./book-detail-modal.component.css']
})
export class BookDetailModalComponent {
  @Input() book: any;
}

