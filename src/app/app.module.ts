import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AllUsersComponent } from './components/all-users/all-users.component';
import { ApisService } from './services/apis.service';
import { ChaneFormatePipe } from '../app/customPipe/changeDateFormate.pipe';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { CommentsComponent } from './components/comments/comments.component';
import { BonusComponent } from './components/bonus/bonus.component'

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AllUsersComponent,
    ChaneFormatePipe,
    UserPostsComponent,
    CommentsComponent,
    BonusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonModule,
    NgxPaginationModule
  ],
  providers: [ApisService],
  bootstrap: [AppComponent]
})
export class AppModule { }
