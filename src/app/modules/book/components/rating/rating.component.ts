import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';
import { NgIf } from "@angular/common"; 

@Component({
  selector: 'app-rating',
  imports: [NgFor, NgIf],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss'
})
export class RatingComponent {

  @Input() rating : number = 0 ;
  maxRating : number = 5 ;

  get fullStares( ) : number{
    return Math.floor(this.rating);
  }

  get halfStares() : boolean{
    return this.rating % 1 !== 0;
  }

  get emptyStares( ) : number{
    return this.maxRating - Math.ceil(this.rating);
  }
}
