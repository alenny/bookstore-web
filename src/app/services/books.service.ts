import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from '../models/book';

const BOOKS: Book[] = [
  { id: 1, title: 'a a', category: 'Teens', author: 'aaa', price: 1.00, publishDate: new Date(), rating: 5.0 },
  { id: 2, title: 'b b', category: 'Teens', author: 'bbb', price: 1.00, publishDate: new Date(), rating: 5.0 },
  { id: 3, title: 'c c', category: 'Mango', author: 'ccc', price: 1.00, publishDate: new Date(), rating: 5.0 },
  { id: 4, title: 'd d', category: 'CS', author: 'ddd', price: 1.00, publishDate: new Date(), rating: 5.0 },
  { id: 5, title: 'e e', category: 'Financial', author: 'eee', price: 1.00, publishDate: new Date(), rating: 5.0 },
];

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor() { }

  getAllBooks(): Observable<Book[]> {
    return of(BOOKS);
  }

  getBookById(id: number): Observable<Book> {
    let results = BOOKS.filter(b => b.id === id);
    return of(results && results.length ? results[0] : null);
  }
}
