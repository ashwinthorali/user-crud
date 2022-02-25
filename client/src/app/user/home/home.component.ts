import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  fullName: string;


  constructor(public userService:UserService) { }

  ngOnInit(): void {
    alert('hi');
    // const response_user = this.userService.getUserList();
    // alert(JSON.stringify(response_user));
    // response_user.subscribe((data:User[])=>{
    //   this.users = data;
    //   console.log('printing ' + this.users);
    // });
    this.userService.getUserList().subscribe((data:User[])=>{
      alert('hi');
      this.users = data;
      alert(JSON.stringify(this.users));
      console.log('printing ' + this.users);
    });
    
  }

}
