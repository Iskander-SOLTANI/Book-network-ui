import { Injectable } from '@angular/core';

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
}
