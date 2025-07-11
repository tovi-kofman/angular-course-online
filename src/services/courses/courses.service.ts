import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
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

  getCourses(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}`, { headers });
  }

  getCourseById(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/${courseId}`, { headers });
  }

  addCourse(title: string, description: string, teacherId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}`, { title, description, teacherId }, { headers });
  }

  updateCourse(id: number, title: string, description: string, teacherId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/${id}`, { title, description, teacherId }, { headers });
  }

  deleteCourse(courseId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
  }

  enrollInCourse(courseId: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
  }

  leaveCourse(courseId: number, userId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
      body: { userId },
      headers
    });
  }
}

// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })

// export class CoursesService {

//   private apiUrl = 'http://localhost:3000/api/courses';

//   constructor(private http: HttpClient) { }

//   getCourses(): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}`, { headers });
//   }

//   getCourseById(courseId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get(`${this.apiUrl}/${courseId}`, { headers });
//   }

//   addCourse(title: string, description: string, teacherId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}`, { title, description, teacherId }, { headers });
//   }

//   updateCourse(id: number, title: string, description: string, teacherId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.put(`${this.apiUrl}/${id}`, { title, description, teacherId }, { headers });
//   }

//   deleteCourse(courseId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}`, { headers });
//   }


//   enrollInCourse(courseId: number, userId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.post(`${this.apiUrl}/${courseId}/enroll`, { userId }, { headers });
//   }

//   leaveCourse(courseId: number, userId: number): Observable<any> {
//     const token = localStorage.getItem('authToken');
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.delete(`${this.apiUrl}/${courseId}/unenroll`, {
//       body: { userId }, 
//       headers
//     });
//   }
// }




