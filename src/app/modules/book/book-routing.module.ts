import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from '../../services/guard/auth.guard';

const routes: Routes = [
   {
    path: '', 
    loadComponent: () => import('./pages/main/main.component').then(m => m.MainComponent),
    canActivate : [authGuard],
    children : [
      {
        path: '', 
        loadComponent: () => import('./pages/book-list/book-list.component').then(m => m.BookListComponent),
        canActivate : [authGuard]
      },
       {
        path: 'my-books', 
        loadComponent: () => import('./pages/my-books/my-books.component').then(m => m.MyBooksComponent),
        canActivate : [authGuard]
      },
      {
        path: 'manage', 
        loadComponent: () => import('./pages/manage-book/manage-book.component').then(m => m.ManageBookComponent),
        canActivate : [authGuard]
      },
      {
        path: 'manage/:bookId', 
        loadComponent: () => import('./pages/manage-book/manage-book.component').then(m => m.ManageBookComponent),
        canActivate : [authGuard]
      },
      {
        path: 'my-borrowed-books', 
        loadComponent: () => import('./pages/borrowed-book-list/borrowed-book-list.component').then(m => m.BorrowedBookListComponent),
        canActivate : [authGuard]
      },
        {
        path: 'my-returned-books', 
        loadComponent: () => import('./pages/return-books/return-books.component').then(m => m.ReturnBooksComponent),
        canActivate : [authGuard]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
