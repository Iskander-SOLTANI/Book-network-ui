import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { CodeInputModule } from 'angular-code-input';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-activate-account',
  imports: [NgIf,   CodeInputModule],
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {
  message: string = "";
  isOkay: boolean = true;
  submitted: boolean = false;

  constructor(
    private router: Router,
    private authServicce : AuthenticationService
  ){

  }

  onCodeCompleted(token: string) {
    this.confirmAccount(token);
  }
  confirmAccount(token: string) {
    this.authServicce.confirm({token}).subscribe({
      next :() => {
        this.message = "Your account has been successfully activated. \n Now you can procced to login ";
        this.submitted = true;
        this.isOkay = true;
      },
      error : (err) => {
        this.message = "Token has been expired or invalid.";
        this.submitted = true;
        this.isOkay = false;
      }
    })
  }

  redirectToLogin() {
  }
  
}
