import { Component } from '@angular/core';
import { PostCreator } from './components/post-creator/post-creator';
import { PostList } from './components/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [PostCreator, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
