import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
	selector: 'app-nav-bar',
	imports: [MatToolbarModule],
	templateUrl: './nav-bar.html',
	styleUrl: './nav-bar.css',
})
export class NavBar {}
