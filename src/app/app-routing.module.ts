import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('@pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('@pages/product/product.module').then((m) => m.ProductModule),
  },
  {
    path: 'borrow',
    loadChildren: () =>
      import('@pages/borrow/borrow.module').then((m) => m.BorrowModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('@pages/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'faq',
    loadChildren: () =>
      import('@pages/faq/faq.module').then((m) => m.FaqModule),
  },

  { path: '', redirectTo: '/product', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
