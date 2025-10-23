import { Routes } from '@angular/router';
import { Main } from './shared/main/main.component';

export const routes: Routes = [
  { path: '', component: Main },
  { path: '**', redirectTo: '' },
];
