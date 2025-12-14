import { Component, inject, signal } from '@angular/core';
import { PostService, NewPost } from '../../services/post.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-post-creator',
  imports: [MatInputModule, MatFormFieldModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './post-creator.html',
  styleUrl: './post-creator.css',
})
export class PostCreator {
  private formBuilder = inject(FormBuilder);

  postForm = this.formBuilder.group({
    title: ["", [Validators.required, Validators.maxLength(25)]],
    content: ["", [Validators.required, Validators. maxLength(7500)]]
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
      content: this.content?.value!
    }

    this.postService.createPost(newPost).subscribe({
      next: (data) => (console.log("Post created successfully!", data)),
      error: (err) => {
        this.title?.setErrors({ 'databaseError': 'Post with same title already exists.'})
      }
    })
  }
}
