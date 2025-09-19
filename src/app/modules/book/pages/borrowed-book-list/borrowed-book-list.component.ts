import { Component, OnInit } from '@angular/core';
import { NgForOf, NgIf } from "@angular/common";
import { BorrowedBookResponse, FeedbackRequest, PageResponseBorrowedBookResponse } from '../../../../services/models';
import { BookService, FeedbackService } from '../../../../services/services';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingComponent } from "../../components/rating/rating.component";
import { BookRoutingModule } from "../../book-routing.module";

@Component({
  selector: 'app-borrowed-book-list',
  imports: [NgForOf, NgIf, CommonModule, FormsModule, RatingComponent, BookRoutingModule],
  templateUrl: './borrowed-book-list.component.html',
  styleUrl: './borrowed-book-list.component.scss'
})
export class BorrowedBookListComponent implements OnInit {
 
  borrowedBooks: PageResponseBorrowedBookResponse = {};
  selectedBook : BorrowedBookResponse |undefined = undefined;
  feedbackRequest : FeedbackRequest = {
    bookId: 0,
    note : 0,
    comment: ''
  };
  page= 0;
  size = 5;

  constructor(
    private bookService : BookService,
    private feedbackService :FeedbackService,
    private router : Router
  ){

  }

 
  ngOnInit(): void {
    this.findAllBorrowedBooks();
  }
  findAllBorrowedBooks() {
    this.bookService.getAllBorrowedBooks({
      page : this.page,
      size : this.size
    }).subscribe({
      next : (resp) => {
        this.borrowedBooks = resp;
      }
    })
  }
  returnedBorrowedBook(book: BorrowedBookResponse) {
    this.selectedBook = book;
    this.feedbackRequest.bookId = book.id as number;
  }

  returnBook(withFeedback: boolean) {
    this.bookService.returnBorrowBook({'book-id' : this.selectedBook?.id as number }).subscribe({
      next : () =>{
        if(withFeedback){
          this.giveFeedback();
        }
        this.selectedBook = undefined;
        this.findAllBorrowedBooks();
      }
    })
  }

  private giveFeedback( ){
    this.feedbackService.saveFeedback({body : this.feedbackRequest}).subscribe({
      next: (res) =>{
        
      }
    });
  }

  goToPage(index : number) {
 this.page = index ;
    this.findAllBorrowedBooks();
  }
  goToPreviousPage() {
     this.page--;
    this.findAllBorrowedBooks();
  }
  goToFirstPage() {
    this.page = 0 ;
    this.findAllBorrowedBooks();
  }
  goToLastPage() {
     this.page = 0 ;
    this.findAllBorrowedBooks();
  }
  goToNextPage() {
  this.page = this.borrowedBooks.totalPages as number - 1 ;
    this.findAllBorrowedBooks();
  }
  get isLastPage() : boolean {
    return this.page == this.borrowedBooks.totalPages as number - 1;
  }
}
