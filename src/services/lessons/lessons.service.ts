import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  private apiUrl = 'http://localhost:3000/api/courses';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private getAuthHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
      if (token) {
        headers = headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  }

  getLessons(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
  }

  getLessonById(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }

  addLesson(title: string, content: string, courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${courseId}/lessons`, { title, content }, { headers });
  }

  updateLesson(courseId: number, lessonId: number, title: string, content: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { title, content, courseId }, { headers });
  }

  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
  }
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LessonsService {

//   private apiUrl = 'http://localhost:3000/api/courses';

//   constructor(private http: HttpClient) { }

//   getLessons(courseId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/${courseId}/lessons`, { headers });
//   }

//   getLessonById(courseId: number, lessonId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
//   }

//   addLesson( title: string, content: string, courseId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}/${courseId}/lessons`, { title, content }, { headers });
//   }

//   updateLesson(courseId: number, lessonId: number, title: string, content: string): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.put(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { title, content, courseId }, { headers });
//   }

//   deleteLesson(courseId: number, lessonId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers });
//   }

// }
