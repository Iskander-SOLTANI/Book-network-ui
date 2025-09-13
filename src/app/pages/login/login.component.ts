import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../services/models';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/services';
import { TokenService } from '../../services/token/token.service';
import { NgForOf, NgIf } from '@angular/common';
@Component({
  selector: 'app-login',
  imports: [NgIf, NgForOf,FormsModule,],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
 authRequest: AuthenticationRequest={email : '', password: ''};
  errorMsg: Array<string> = [];

  constructor(   
    private router : Router,
    private authService : AuthenticationService,
    private tokenService : TokenService
  ){
  }

register() {
  this.router.navigate(['register']);
}
login() {
  this.errorMsg = [];
  this.authService.authenticate({body : this.authRequest}).subscribe({
    next: (res)=>{
      this.tokenService.setToken =res.token as string;
      this.router.navigate(['books']);
    }, 
    error : (err) =>{
      console.log(err);
      if(err.error.validationErrors){
        this.errorMsg = err.error.validationErrors;
      }else{
        this.errorMsg.push(err.error.error);
      }
    }
  });
  
} 

}
