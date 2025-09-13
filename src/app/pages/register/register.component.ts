import { Component } from '@angular/core';
import { RegistrationRequest } from '../../services/models/registration-request';
import { AuthenticationService } from '../../services/services';
import { NgForOf, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: 'app-register',
  imports: [NgIf, NgForOf, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerRequest : RegistrationRequest = {
      email: '',
      lastName: '',
      password: '',
      userName: ''
   }
   errorMsg : Array<string> = [];

   
   constructor(
    private authService: AuthenticationService,
    private router: Router
   ){ }

   register(){
    this.errorMsg = [];
    this.authService.register({body : this.registerRequest}).subscribe({
      next : () => {
        this.router.navigate(['activate-account']);
      },
      error: (err) => {
         console.log(err);
        this.errorMsg = err.error.validationErrors;
      }
    });
   }
   login() {
    this.router.navigate(['login']);
  }
}
