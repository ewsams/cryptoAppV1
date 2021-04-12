import { Component, OnInit } from '@angular/core';
import { CommentsService } from '../services/comments.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  loading = true;
  comments: Comment[];
  currentComment: Comment = {
    id: 0,
    title: '',
    body: '',
    likeAllowed: true,
    likeCount: 0,
    isEdit: false,
    likeUrl: '../../../../assets/img/heart-icon.png',
  };

  constructor(private commentService: CommentsService) {}

  ngOnInit() {
    this.commentService.getPosts().subscribe((comments) => {
      this.comments = comments;
      this.comments.forEach((element) => {
        element.likeCount = 0;
        element.likeUrl = '../../../../assets/img/heart-icon.png';
        element.isEdit = false;
        element.likeAllowed = true;
      });
      this.loading = false;
    });
  }

  onNewPost(comment: Comment) {
    this.comments.unshift(comment);
  }

  editPost(comment: Comment) {
    this.currentComment.id = comment.id;
    this.currentComment.title = comment.title;
    this.currentComment.body = comment.body;
    this.currentComment.isEdit = true;
  }

  onUpdatedPost(comment: Comment) {
    this.comments.forEach((cur, index) => {
      if (comment.id === cur.id) {
        this.comments.splice(index, 1);
        this.comments.unshift(comment);
        this.currentComment = {
          id: 0,
          title: '',
          body: '',
          likeUrl: comment.likeUrl,
          isEdit: false,
        };
      }
    });
  }

  removePost(comment: Comment) {
    if (confirm('Are You Sure?')) {
      this.commentService.removePost(comment.id).subscribe(() => {
        this.comments.forEach((cur, index) => {
          if (comment.id === cur.id) {
            this.comments.splice(index, 1);
          }
        });
      });
    }
  }
  addLike(comment: Comment) {
    this.comments.forEach((cur, index) => {
      if (comment.id === cur.id) {
        comment.likeAllowed = false;
        this.currentComment.likeCount = comment.likeCount + 1;
      } else if (!this.currentComment.likeAllowed) {
        this.currentComment.likeUrl = '../../../../assets/img/heart-icon.png';
      }
    });
  }
}
