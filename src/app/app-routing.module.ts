import { AllUsersComponent } from './components/all-users/all-users.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { BonusComponent } from './components/bonus/bonus.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', component: AllUsersComponent},
  {path: 'users/:id', component: UserPostsComponent},
  {path: 'comments/:id', component: CommentsComponent},
  {path: 'bonus', component: BonusComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
