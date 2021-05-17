import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'}),
};


@Injectable({
  providedIn: 'root'
})
export class LotteryService {
  numbersUrl = 'https://www.random.org/integers/?num=10&min=0&max=100&col=1&base=10&format=plain&rnd=new';

  constructor(private http: HttpClient) {}

  getNumbers() {
  return this.http.get(this.numbersUrl, {responseType: 'text'});
  }
}


