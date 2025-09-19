import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-book-list',
  imports: [BookCardComponent, NgFor, NgIf],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss'
})
export class BookListComponent implements OnInit{

  page: number = 0;
  pages: any = [];
  size: number = 5;
  books : PageResponseBookResponse = {};
  message : string ='';
  level : string = 'success';


  constructor(
    private bookService: BookService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
   this.bookService.getAllBooks({
      page: this.page,
      size: this.size
    })
      .subscribe({
        next: (books) => {
          this.books = books;
          console.log(books);
          this.pages = Array(this.books.totalPages)
            .fill(0)
            .map((x, i) => i);
        }
      });
  }

  goToPage(index : number) {
 this.page = index ;
    this.findAllBooks();
  }
  goToPreviousPage() {
     this.page--;
    this.findAllBooks();
  }
  goToFirstPage() {
    this.page = 0 ;
    this.findAllBooks();
  }
  goToLastPage() {
     this.page = 0 ;
    this.findAllBooks();
  }
  goToNextPage() {
  this.page = this.books.totalPages as number - 1 ;
    this.findAllBooks();
  }
  get isLastPage() : boolean {
    return this.page == this.books.totalPages as number - 1;
  }

  borrowBook(book: BookResponse) {
    this.message = '';
    this.bookService.borrowBook({'book-id': book.id as number}).subscribe({
      next : () => {
        this.level = 'success';
        this.message = 'Book successfully added to your list';
      },
      error : (error) =>{
        console.log(error);
        this.level ='error';
        this.message = error.error.error;
      } 
    });
  }
}
