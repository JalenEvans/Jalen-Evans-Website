import { Component, signal } from '@angular/core';
import { PostList } from "./components/post-list/post-list";
import { PostCreator } from "./components/post-creator/post-creator";

@Component({
  selector: 'app-root',
  imports: [PostList, PostCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');
}
