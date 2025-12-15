import { Component } from '@angular/core';
import { NavBar } from './components/nav-bar/nav-bar';
import { RouterOutlet } from '@angular/router';

@Component({
	selector: 'app-root',
	imports: [NavBar, RouterOutlet],
	templateUrl: './app.html',
	styleUrl: './app.css',
})
export class App {}
