import { Component, OnInit } from '@angular/core';
import { BookService } from '../../../../services/services';
import { Router } from '@angular/router';
import { BorrowedBookResponse, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-return-books',
  imports: [NgIf,NgFor],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent  implements OnInit{

  returnBooks: PageResponseBorrowedBookResponse = {};
  page= 0;
  size = 5;
  message : string ='';
  level : string = 'success';

  constructor(
    private bookService : BookService,
    private router : Router
  ){

  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }
  findAllReturnedBooks() {
    this.bookService.getAllReturnedBooks({
      page : this.page,
      size : this.size
    }).subscribe({
      next : (resp) => {
        this.returnBooks = resp;
        console.log(this.returnBooks);
      }
    })
  }

  approvedReturnedBook(book: BorrowedBookResponse) {
    if(!book.returned){
        this.level = 'error';
        this.message = 'book is not yet returned';
      return;
    }
    this.bookService.updateReturnedApprovedBookStatus({ 'book-id' : book.id as number}).subscribe({
      next : () => {
        this.findAllReturnedBooks();
        this.level = 'success';
        this.message = 'book return approved';
      }
    });
  }

  goToPage(index : number) {
 this.page = index ;
    this.findAllReturnedBooks();
  }
  goToPreviousPage() {
     this.page--;
    this.findAllReturnedBooks();
  }
  goToFirstPage() {
    this.page = 0 ;
    this.findAllReturnedBooks();
  }
  goToLastPage() {
     this.page = 0 ;
    this.findAllReturnedBooks();
  }
  goToNextPage() {
  this.page = this.returnBooks.totalPages as number - 1 ;
    this.findAllReturnedBooks();
  }
  get isLastPage() : boolean {
    return this.page == this.returnBooks.totalPages as number - 1;
  }
}
