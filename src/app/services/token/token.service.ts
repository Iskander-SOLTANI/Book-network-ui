import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  set setToken (token : string){
    sessionStorage.setItem('token', token);
  }

  get getToken (){
    return sessionStorage.getItem('token') as string;
  }

  isTokenNotValid() {
    return !this.isTokenValid();
  }
  isTokenValid(){
    const token = this.getToken;
    if(!token){
    return false;
    }
    const jwtHelper: JwtHelperService = new JwtHelperService();
    const isTokenExpired =jwtHelper.isTokenExpired(token);
    if(isTokenExpired){
      sessionStorage.clear();
      return false;
    }
    return true;
  }
}
