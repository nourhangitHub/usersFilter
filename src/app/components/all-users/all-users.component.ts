import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from 'src/app/services/apis.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit, DoCheck {
  allUsersData;
  returnSearchData: boolean;
  totalRecords: string;
  pageNumber: any = 1;
  itemsPerPage: number[] = [5,10,15,20];
  perPage: number = 5;
  availableStatus: string[]= [];
  nonRepeatStatus;
  isFilterByStatus: boolean = false;
  statusFilterValue;
  availableGender: string[]= [];
  nonRepeatGender;
  isFilterByGender: boolean = false;
  genderFilterValue;
  availableNames: string[]= [];
  nameFilterValue;
  isFilterByName: boolean = false;
  nonRepeatNames;
  availableCreatedDate: string[]= [];
  createdDateFilterValue
  isFilterByCreatedDate: boolean = false;
  nonRepeatCreatedDate
  availableUpdatedDate: string[]= [];
  updatedDateFilterValue
  isFilterByUpdatedDate: boolean = false;
  nonRepeatUpdatedDate;
  constructor(private apiSevice: ApisService, private router: Router) { }

  ngOnInit(): void {
    this.allUsers();
  }

  ngDoCheck(){
    if(!this.isFilterByName && this.allUsersData !== undefined){
      this.apiSevice.getAllUsers().subscribe(res =>{
        this.allUsersData = res.data
        this.filterByName(this.nameFilterValue);
      })
    }
    if(!this.isFilterByStatus && this.allUsersData !== undefined){
      this.apiSevice.getAllUsers().subscribe(res =>{
        this.allUsersData = res.data
        this.filterByStatus(this.statusFilterValue);
      })
    }
    if(!this.isFilterByGender && this.allUsersData !== undefined){
      this.apiSevice.getAllUsers().subscribe(res =>{
        this.allUsersData = res.data
        this.filterByGender(this.genderFilterValue);
      })
    }
    // if(!this.isFilterByCreatedDate && this.allUsersData !== undefined){
    //   this.apiSevice.getAllUsers().subscribe(res =>{
    //     this.allUsersData = res.data
    //     this.filterByGender(this.createdDateFilterValue);
    //   })
    // }
  }

  allUsers() : Observable<any>{
    this.apiSevice.getAllUsers().subscribe(res =>{
      if(res.code === 200){
        this.allUsersData = res.data
        this.totalRecords = res.data.length;
        if(res.data.lenght !== 0){
          this.availableNames = this.allUsersData.map(user =>{
            return user.name
          });
          this.nonRepeatNames = new Set(this.availableNames);
          this.availableStatus = this.allUsersData.map(user =>{
            return user.status
          });
          this.nonRepeatStatus = new Set(this.availableStatus);
          this.availableGender = this.allUsersData.map(user =>{
            return user.gender
          });
          this.nonRepeatGender = new Set(this.availableGender);
          
          this.availableCreatedDate = this.allUsersData.map(user =>{
            return user.created_at
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
          this.nonRepeatCreatedDate = this.availableCreatedDate;

          this.availableUpdatedDate = this.allUsersData.map(user =>{
            return user.updated_at
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
          this.nonRepeatUpdatedDate = this.availableUpdatedDate;
          this.returnSearchData = true;
        }else{
          this.returnSearchData = false;
        }
      }
    })
    return 
  }

  filterByName(filter: string){
    this.allUsersData = this.allUsersData.filter(user =>{
      return user.name.match(filter)
    });
    if(this.allUsersData.length > 0){
      this.isFilterByName = true;
    }else{
      this.isFilterByName = false;
      this.allUsers();
    }
    return this.allUsersData
  }

  filterByGender(filter: string){
    this.allUsersData = this.allUsersData.filter(user =>{
      return user.gender.match(filter)
    });
    if(this.allUsersData.length > 0){
      this.isFilterByGender = true;
    }else{
      this.isFilterByGender = false;
      this.allUsers();
    }
    return this.allUsersData
  }

  filterByStatus(filter: string){
    this.allUsersData = this.allUsersData.filter(user =>{
      return user.status.match(filter)
    });
    if(this.allUsersData.length > 0){
      this.isFilterByStatus = true;
    }else{
      this.isFilterByStatus = false;
      this.allUsers();
    }
    return this.allUsersData
  }

  filter(filter: string) {
    if (filter.length === 0) {
      this.allUsers()
      return this.allUsersData;
    }
    else {
      this.allUsersData = (this.allUsersData.filter(i => {
        let name = i.name;
        let email = i.email;
        return `${name ? name.toLowerCase() : ''}
          ${email ? email.toLowerCase() : ''}
          `.indexOf(filter.toLowerCase()) !== -1;
      }))
      if(this.allUsersData.length === 0 ){
        this.returnSearchData = false;
      }else{
        this.returnSearchData = true;
      }
      return this.allUsersData;
    }
  }

  filterByCreatedDate(filter: string){
    this.allUsersData = this.allUsersData.filter(user =>{
      return user.created_at.match(filter)
    });
    if(this.allUsersData.length > 0){
      this.isFilterByCreatedDate = true;
    }else{
      this.isFilterByCreatedDate = false;
      this.allUsers();
    }
    return this.allUsersData
  }

  filterByUpdatedDate(filter: string){
    this.allUsersData = this.allUsersData.filter(user =>{
      return user.updated_at.match(filter)
    });
    if(this.allUsersData.length > 0){
      this.isFilterByUpdatedDate = true;
    }else{
      this.isFilterByUpdatedDate = false;
      this.allUsers();
    }
    return this.allUsersData
  }

  userPosts(user){
    this.router.navigate(
      ['../users',user.id, 
      {name: user.name, email: user.email, status: user.status, userCreationDate: user.created_at, userUpdatedDate: user.updated_at}
    ])
  }

}
