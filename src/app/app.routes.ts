import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';
import { authGuard } from './services/guard/auth.guard';

export const routes: Routes = [
{
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component').then(m => m.RegisterComponent)
  },
  {
    path: 'activate-account',
    loadComponent: () => import('./pages/activate-account/activate-account.component').then(m => m.ActivateAccountComponent)
  },
  {
    path: 'books',
    loadChildren: () => import('./modules/book/book.module').then(m => m.BookModule),
    canActivate : [authGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
