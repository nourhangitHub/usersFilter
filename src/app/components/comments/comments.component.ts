import { Component, OnInit, DoCheck } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, DoCheck {
  userName;
  userEmail;
  userStatus;
  postId;
  allComments;
  noComments: boolean = false;
  totalRecords: string;
  pageNumber: any = 1;
  perPage: number = 5;
  itemsPerPage: number[] = [5,10,15,20];
  availableNames: string[]= [];
  nameFilterValue;
  isFilterByName: boolean = false;
  nonRepeatNames;
  availableCreatedDate: string[]= [];
  createdDateFilterValue
  isFilterByCreatedDate: boolean = false;
  nonRepeatCreatedDate;
  emptyCratedDate;
  availableUpdatedDate: string[]= [];
  updatedDateFilterValue
  isFilterByUpdatedDate: boolean = false;
  nonRepeatUpdatedDate;
  emptyUpdatedDate;
  constructor(private activRoute: ActivatedRoute, private apiSevice: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.activRoute.snapshot.params.name;
    this.userEmail = this.activRoute.snapshot.params.email;
    this.userStatus = this.activRoute.snapshot.params.status;
    this.postId = this.activRoute.snapshot.params.id;
    this.getComments();
  }

  ngDoCheck(){
    if(!this.isFilterByName && this.allComments !== undefined){
      this.apiSevice.getComments(this.postId).subscribe(res =>{
        this.allComments = res.data
        this.filterByName(this.nameFilterValue);
      })
    }
  }

  getComments(){
    this.apiSevice.getComments(this.postId).subscribe(res =>{
      if(res.code === 200){
        this.allComments = res.data;
        this.totalRecords = this.allComments.length
        if(this.allComments.length === 0){
          this.noComments = true;
        }else{
          this.availableNames = this.allComments.map(comment =>{
            return comment.name
          });
          this.nonRepeatNames = new Set(this.availableNames);

          this.availableCreatedDate = this.allComments.map(comment =>{
            return comment.created_at
          });
          
          //remove the same created dates
          for(let i = 0; i < this.availableCreatedDate.length; i++){
            for(let j = 1; j < this.availableCreatedDate.length; j++){
              if(this.availableCreatedDate[i] === this.availableCreatedDate[j]){
                this.availableCreatedDate.splice(this.availableCreatedDate.indexOf(this.availableCreatedDate[j]), 1);
                this.availableCreatedDate.length--
              }
            }
          }
          if(this.availableCreatedDate.length === 0){
            this.emptyCratedDate = null;
          }else{
            this.nonRepeatCreatedDate = this.availableCreatedDate;
          }
          
          this.availableUpdatedDate = this.allComments.map(comment =>{
            return comment.updated_at
          });
          //remove the same updated dates
          for(let i = 0; i < this.availableUpdatedDate.length; i++){
            for(let j = 1; j < this.availableUpdatedDate.length; j++){
              if(this.availableUpdatedDate[i] === this.availableUpdatedDate[j]){
                this.availableUpdatedDate.splice(this.availableUpdatedDate.indexOf(this.availableUpdatedDate[j]), 1);
                this.availableUpdatedDate.length--
              }
            }
          }
          if(this.availableUpdatedDate.length === 0){
            this.emptyUpdatedDate = null;
          }else{
            this.nonRepeatUpdatedDate = this.availableUpdatedDate;
          }
          
          this.noComments = false;
        }
      }
    })
  }

  filterByName(filter: string){
    this.allComments = this.allComments.filter(comment =>{
      return comment.name.match(filter)
    });
    if(this.allComments.length > 0){
      this.isFilterByName = true;
    }else{
      this.isFilterByName = false;
      this.getComments()
    }
    return this.allComments
  }

  filterByCreatedDate(filter: string){
    this.allComments = this.allComments.filter(comment =>{
      return comment.created_at.match(filter)
    });
    if(this.allComments.length > 0){
      this.isFilterByCreatedDate = true;
    }else{
      this.isFilterByCreatedDate = false;
      this.getComments();
    }
    return this.allComments
  }

  filterByUpdatedDate(filter: string){
    this.allComments = this.allComments.filter(comment =>{
      return comment.updated_at.match(filter)
    });
    if(this.allComments.length > 0){
      this.isFilterByUpdatedDate = true;
    }else{
      this.isFilterByUpdatedDate = false;
      this.getComments();
    }
    return this.allComments
  }

}
