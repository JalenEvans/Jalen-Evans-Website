import { Component, signal } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MarkdownComponent } from 'ngx-markdown';
import { PostItem } from '../post-item/post-item';

@Component({
	selector: 'app-post-list',
	imports: [MatButtonModule, MatCardModule, MarkdownComponent, PostItem],
	templateUrl: './post-list.html',
	styleUrl: './post-list.css',
})
export class PostList {
	posts: Post[] = [];
	error = '';
	selectedPost = signal<Post | null>(null);

	constructor(private postService: PostService) {}

	ngOnInit() {
		this.postService.getPosts().subscribe({
			next: (data) => {
				this.posts = data;
			},
			error: (err) => (this.error = err.message),
		});
	}
}
