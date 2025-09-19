import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BookResponse } from '../../../../services/models';
import { NgIf } from "@angular/common";
import { RatingComponent } from "../rating/rating.component";

@Component({
  selector: 'app-book-card',
  imports: [NgIf, RatingComponent],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss'
})
export class BookCardComponent {

  private _book : BookResponse = {};
  private _bookCover : string | undefined;
  private _menage  = false;

  get bookCover() : string | undefined {
    if(this._book.cover){
      return 'data:image/jpg;base64,' + this._book.cover;
    }
    return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
  }

  get book() : BookResponse {
    return this._book;
  }
  @Input()
  set book(value : BookResponse){
    this._book = value;
  }

  get menage() : boolean {
    return this._menage;
  }

  @Input()
  set menage(value : boolean){
    this._menage = value;
  }

  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private showDetails: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaittingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onArchive() {
      this.archive.emit(this._book);
  }
  onShare() {
      this.share.emit(this._book);
  }
  onEdit() {
    this.edit.emit(this._book);
  }
  addToWaittigList() {
    this.addToWaittingList.emit(this._book);
  }
  onBorrow() {
    this.borrow.emit(this._book);
  }
  onShowDetails() {
    this.showDetails.emit(this._book);
  }
}
