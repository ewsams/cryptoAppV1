import { EventEmitter, Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss'],
})
export class CommentFormComponent implements OnInit {
  @Output() newPost: EventEmitter<Comment> = new EventEmitter();
  @Output() updatedPost: EventEmitter<Comment> = new EventEmitter();
  @Input() currentComment: Comment;

  constructor(private commentsService: CommentsService) {}

  ngOnInit() {}

  addPost(title, body) {
    if (!title || !body) {
      alert('Please add comment');
    } else {
      this.commentsService
        .savePost({ title, body } as Comment)
        .subscribe((post) => {
          this.newPost.emit(post);
        });
    }
  }

  updatePost() {
    this.commentsService
      .updatePost(this.currentComment)
      .subscribe((comment) => {
        console.log(comment);
        const updateComment = {
          id: this.currentComment.id,
          title: this.currentComment.title,
          body: this.currentComment.body,
          likes: this.currentComment.likeCount,
          likeUrl: this.currentComment.likeUrl,
          likeCount: this.currentComment.likeCount,
          isEdit: this.currentComment.isEdit,
          likeAllowed: this.currentComment.likeAllowed
        };
        this.updatedPost.emit(updateComment);
      });
  }
}





