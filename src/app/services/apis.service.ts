import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  apiUrl="https://gorest.co.in/public-api";
  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.apiUrl}/users`);
  }

  getUserPosts(userId): Observable<any>{
    return this.http.get(`${this.apiUrl}/users/${userId}/posts`);
  }

  getComments(postId): Observable<any>{
    return this.http.get(`${this.apiUrl}/posts/${postId}/comments`);
  }
}
