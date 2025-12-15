import { Routes } from '@angular/router';
import { PostList } from './components/post-list/post-list';
import { PostCreator } from './components/post-creator/post-creator';

export const routes: Routes = [
	{ path: 'home', component: PostCreator },
	{ path: 'blog', component: PostList },
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];
