import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {Comment} from '../models/comment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentLatestLikes = new BehaviorSubject<Comment>(
    null
  );
  commentLikeObservable$ = this.commentLatestLikes.asObservable();
  commentsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.commentsUrl);
  }

  savePost(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.commentsUrl, comment, httpOptions);
  }

  updatePost(comment: Comment): Observable<Comment> {
    const url = `${this.commentsUrl}/${comment.id}`;

    return this.http.put<Comment>(url, comment, httpOptions);
  }

  removePost(comment: Comment | number): Observable<Comment> {
    const id = typeof comment === 'number' ? comment : comment.id;
    const url = `${this.commentsUrl}/${id}`;

    return this.http.delete<Comment>(url, httpOptions);
  }

  commentLiked(comment: Comment) {
    return this.commentLatestLikes.next(comment);
  }
}


