import { Component, inject } from '@angular/core';
import { PostService, NewPost } from '../../services/post.service';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
	ReactiveFormsModule,
	Validators,
	FormGroup,
	FormBuilder,
	AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MarkdownComponent } from 'ngx-markdown';

@Component({
	selector: 'app-post-creator',
	imports: [
		MatInputModule,
		MatFormFieldModule,
		ReactiveFormsModule,
		MatButtonModule,
		MarkdownComponent,
	],
	templateUrl: './post-creator.html',
	styleUrl: './post-creator.css',
})
export class PostCreator {
	private formBuilder = inject(FormBuilder);
	private snackBar = inject(MatSnackBar);

	postForm = this.formBuilder.group({
		title: ['', [Validators.required, Validators.maxLength(25)]],
		content: ['', [Validators.required, Validators.maxLength(7500)]],
	});

	get title() {
		return this.postForm.get('title');
	}

	get content() {
		return this.postForm.get('content');
	}

	constructor(private postService: PostService) {}

	onSubmit() {
		let newPost: NewPost = {
			title: this.title?.value!,
			content: this.content?.value!,
		};

		this.postService.createPost(newPost).subscribe({
			next: () =>
				this.snackBar.open('Post Created Successfully!', '', {
					duration: 3000,
				}),
			error: () => {
				this.title?.setErrors({
					databaseError: 'Post with same title already exists.',
				});
				this.snackBar.open('Posting was unsuccessful.', '', {
					duration: 3000,
				});
			},
		});
	}

	onCancel() {
		this.resetInput(this.title!);
		this.resetInput(this.content!);
	}

	resetInput(input: AbstractControl) {
		input.setValue('');
		input.markAsPristine();
		input.markAsUntouched();
	}
}
