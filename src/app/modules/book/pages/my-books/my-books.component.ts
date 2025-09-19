import { Component, OnInit } from '@angular/core';
import { BookResponse, PageResponseBookResponse } from '../../../../services/models';
import { BookService } from '../../../../services/services/book.service';
import { Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { BookCardComponent } from "../../components/book-card/book-card.component";
import { BookRoutingModule } from "../../book-routing.module";

@Component({
  selector: 'app-my-books',
  imports: [NgFor, BookCardComponent, BookRoutingModule],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss'
})
export class MyBooksComponent implements OnInit{
  
  page: number = 0;
  size: number = 5;
  books : PageResponseBookResponse = {};


  constructor(
    private bookService: BookService,
    private router: Router
  ){

  }
  ngOnInit(): void {
    this.findAllBooks();
  }
  findAllBooks() {
      this.bookService.getAllBooksByOwner({
    page : this.page ,
    size: this.size 
  }).subscribe({
    next : (data : PageResponseBookResponse) =>{
      if (data.content && data.content.length > 0) {
        this.books = data;
      } else {
       this.books = {
          content: [
            {
              id: 1,
              title: 'Livre Démo',
              author: 'Auteur Démo',
              rate: 3.5
            },
            {
              id: 2,
              title: 'Deuxième Livre',
              author: 'Auteur 2',
              rate: 4.5
            }
          ],
          totalPages: 1,
          totalElements: 2,
          size: this.size,
          number: this.page,
          first: true,
          last : false,
        }
      }

      console.log(this.books);
    }
  })
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

archiveBook(book: BookResponse) {
  this.bookService.updateArchivedBookStatus({'book-id' : book.id as number}).subscribe({
    next : () => {
      book.archived = !book.archived
    }
  });
}
shareBook(book: BookResponse) {
  this.bookService.updateShareableBookStatus({'book-id' : book.id as number}).subscribe({
    next : () => {
      book.shareable = !book.shareable
    }
  });
}
editBook(book: BookResponse) {
  this.router.navigate(['books','manage',book.id]);
}
}
