import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

export interface Post {
  post_id: string,
  title: string,
  content: string,
  created_at: string,
  updated_at: string | null,
}

export interface NewPost {
  title: string,
  content: string,
}

@Injectable({
  providedIn: 'root',
})
export class Post {
  private apiURL = "http://127.0.0.1:3000/posts";

  constructor(private http: HttpClient) {}

  createPost(post: NewPost): Observable<Post> {
    return this.http.post<Post>(this.apiURL, post).pipe(catchError(this.handleError));
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.apiURL).pipe(catchError(this.handleError));
  }

  getPost(post_id: string): Observable<Post> {
    return this.http.get<Post>(`${this.apiURL}/${post_id}`).pipe(catchError(this.handleError));
  }

  updatePost(post_id: string, post: Partial<NewPost>): Observable<Post> {
    return this.http.put<Post>(`${this.apiURL}/${post_id}`, post_id).pipe(catchError(this.handleError));
  }

  deletePost(post_id:string): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${post_id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(`API Error: ${error}`);
    return throwError(() => new Error(error.message || "Server error"));
  }
  
}
