import { Component } from '@angular/core';
import { PostService, Post } from '../../services/post.service';

@Component({
  selector: 'app-post-list',
  imports: [],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  posts: Post[] = [];
  error = "";

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getPosts().subscribe({
      next: (data) => (this.posts = data),
      error: (err) => (this.error = err.message)
    });
  }
}
