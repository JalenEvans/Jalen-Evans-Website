import { Component, input, model } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { EllipsePipe } from '../../pipes/ellipse-pipe';
import { DatePipe, NgClass } from '@angular/common';
import { Post } from '../../services/post.service';

@Component({
	selector: 'app-post-item',
	imports: [MatCardModule, EllipsePipe, DatePipe, NgClass],
	templateUrl: './post-item.html',
	styleUrl: './post-item.css',
})
export class PostItem {
	post = input<Post>();
	selectedPost = model<Post | null>(null);

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
