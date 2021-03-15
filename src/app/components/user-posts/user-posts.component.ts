import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  userName;
  userEmail;
  userStatus;
  userCreatedAt;
  userUpdatedAt;
  userId;
  allPosts;
  noPosts: boolean = false;
  totalRecords: string;
  pageNumber: any = 1;
  perPage: number = 5;
  itemsPerPage: number[] = [5,10,15,20];
  constructor(private activRoute: ActivatedRoute, private apiSevice: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.activRoute.snapshot.params.name;
    this.userEmail = this.activRoute.snapshot.params.email;
    this.userStatus = this.activRoute.snapshot.params.status;
    this.userCreatedAt = this.activRoute.snapshot.params.userCreationDate;
    this.userUpdatedAt = this.activRoute.snapshot.params.userUpdatedDate
    this.userId = this.activRoute.snapshot.params.id;
    this.userPosts();
  }

  userPosts(): Observable<any>{
    this.apiSevice.getUserPosts(this.userId).subscribe(res =>{
      if(res.code === 200){
        this.allPosts = res.data;
        this.totalRecords = this.allPosts.length
        if(this.allPosts.length === 0){
          this.noPosts = true;
        }else{
          this.noPosts = false;
        }
      }
    })
    return
  }

  postComments(post){
    this.router.navigate(
      ['../comments',post.id, 
      {name: this.userName, email: this.userEmail, status: this.userStatus}
    ])
  }

}
