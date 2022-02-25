import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SigninComponent } from './user/signin/signin.component';
import { HomeComponent } from './user/home/home.component';

const routes: Routes = [
  {
    path:'signin', component: UserComponent,
    children: [{path:'', component: SigninComponent}]
  },
  {
    path:'signup', component: UserComponent,
    children: [{path:'', component: SignUpComponent}]
  },
  {
    path:'', redirectTo:'/signin', pathMatch: 'full'
  },
  {
    path:'home', component: UserComponent,
    children: [{path:'', component: HomeComponent}]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
