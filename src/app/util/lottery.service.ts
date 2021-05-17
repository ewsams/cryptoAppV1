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
  numbersUrl = 'http://www.randomnumberapi.com/api/v1.0/randomredditnumber?min=1&max=100&count=5';

  constructor(private http: HttpClient) {}

  getNumbers(): Observable<any[]> {
    return this.http.get<any[]>(this.numbersUrl);
  }
}


