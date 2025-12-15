import { Component } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe } from '@angular/common';
import { EllipsePipe } from '../../pipes/ellipse-pipe';

@Component({
  selector: 'app-post-list',
  imports: [MatButtonModule, MatCardModule, DatePipe, EllipsePipe],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  posts: Post[] = [];
  error = "";
new: any;

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (data) => {this.posts = data},
      error: (err) => (this.error = err.message)
    });
  }

  onClick() {
    console.log("BAM")
  }
}
