import { Component, signal } from '@angular/core';
import { PostCreator } from './components/post-creator/post-creator';

@Component({
  selector: 'app-root',
  imports: [PostCreator],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
