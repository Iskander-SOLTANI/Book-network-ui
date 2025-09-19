import { Component, OnInit } from '@angular/core';
import { NgIf, NgForOf } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BookRequest, BookResponse } from '../../../../services/models';
import { CommonModule } from '@angular/common';
import { BookRoutingModule } from "../../book-routing.module";
import { BookService } from '../../../../services/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage-book',
  imports: [NgIf, NgForOf, FormsModule, CommonModule, BookRoutingModule],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent implements OnInit {

  errorMsg : Array<string> = [];
  selectedPicture: string | undefined;
  selectedBookCover : any;
  bookRequest : BookRequest = {
    authorName: '',
    isbn: '',
    synopsis: '',
    title: ''
  };

  constructor(private bookService : BookService, private router: Router, private activateRoute : ActivatedRoute){

  }

  ngOnInit(): void {
    const bookId = this.activateRoute.snapshot.params['bookId'];
    if(bookId){
      this.bookService.getBook({'book-id' : bookId}).subscribe({
        next : (book : BookResponse) =>{
          this.bookRequest = {
            id : book.id,
            title : book.title as string,
            authorName : book.author as string,
            isbn : book.isbn as string,
            synopsis : book.synopsis as string,
            shareable : book.shareable,
          }
          if(book.cover){
            this.selectedPicture = "data:image/jpg;base64," + book.cover;
          }
        }
      });
    }

  }

  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    if(this.selectedBookCover){
      const reader :FileReader = new FileReader;
      reader.onload = () =>{
        this.selectedPicture = reader.result as string;
      }
      reader.readAsDataURL(this.selectedBookCover);
    }
  }

  saveBook() {
    this.bookService.addBook({body :this.bookRequest}).subscribe({
      next : (bookId : number) => {
        this.bookService.uploadBookCover({
          'book-id' : bookId,
          body :{
            file: this.selectedBookCover
          }
        }).subscribe({
          next : () => {
            this.router.navigate(['/books/my-books']);
          }
        })
      },
      error : (err) =>{
        this.errorMsg = err.error.validationErrors;
      } 
    });
  }
}
