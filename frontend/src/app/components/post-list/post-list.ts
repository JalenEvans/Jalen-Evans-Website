import { Component, signal } from '@angular/core';
import { PostService, Post } from '../../services/post.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DatePipe, NgClass } from '@angular/common';
import { EllipsePipe } from '../../pipes/ellipse-pipe';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-post-list',
	imports: [
		MatButtonModule,
		MatCardModule,
		DatePipe,
		EllipsePipe,
		MarkdownComponent,
		NgClass,
	],
	templateUrl: './post-list.html',
	styleUrl: './post-list.css',
})
export class PostList {
	posts: Post[] = [];
	error = '';
	selectedPost = signal<Post | null>(null);
	m: any;

	constructor(private postService: PostService) {}

	ngOnInit() {
		this.postService.getPosts().subscribe({
			next: (data) => {
				this.posts = data;
			},
			error: (err) => (this.error = err.message),
		});
	}

	onClick(post: Post) {
		if (
			this.selectedPost() != null &&
			this.selectedPost()!.post_id === post.post_id
		) {
			this.selectedPost.set(null);
		} else {
			this.selectedPost.set(post);
		}
	}
}
