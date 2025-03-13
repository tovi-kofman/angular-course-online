import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  register(body: {name: string, email: string, password: string, role: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, body);
  }

  login(body: {email: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, body);
  }

  getUserId(): number {
    const userId = localStorage.getItem('userId');
    return userId ? +userId : 0;
  }
}
