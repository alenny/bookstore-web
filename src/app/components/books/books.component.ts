import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[] = [];
  selectedBook: Book = null;

  constructor(
    private booksService: BooksService
  ) { }

  ngOnInit() {
    this.booksService.getAllBooks()
      .subscribe(books => {
        this.books = books;
        if (this.books.length > 0) {
          this.selectBook(this.books[0]);
        }
      });
  }

  selectBook(book: Book) {
    this.booksService.getBookById(book.id)
      .subscribe(
        book => this.selectedBook = book,
        err => alert(`Cannot find the book with id ${book.id}`));
  }

  resetBook() {
    this.selectBook(this.selectedBook);
  }
}
