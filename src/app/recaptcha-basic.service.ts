import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RecaptchaBasicService {

  constructor(private _http:HttpClient) { }

  // checkRecaptcha(body: any){
  //   return this._http.post('http://localhost:3000/', body)
  // }
}
