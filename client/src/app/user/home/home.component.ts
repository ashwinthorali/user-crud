import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

export interface DialogData {
  id: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users: User[];
  fullName: string;
  displayedColumns: string[];


  constructor(public userService:UserService, public router:Router, public dialog:MatDialog) { }

  ngOnInit(): void {
    // const response_user = this.userService.getUserList();
    // alert(JSON.stringify(response_user));
    // response_user.subscribe((data:User[])=>{
    //   this.users = data;
    //   console.log('printing ' + this.users);
    // });
    this.userService.getUserList().subscribe((data:User[])=>{
      this.users = data;
      console.log('printing ' + this.users);
    });
    this.displayedColumns = ['name', 'email', 'update', 'delete'];
    this.refresh();
  }

  // onDelete(id:number){
  //   alert(id)
  //   console.log(id)
  //   this.userService.delete(id).subscribe(
  //     res => {
  //       alert(res)
  //       console.log(res);
  //       // this.router.navigate(['/home']);
  //     },
  //     err => {
  //       console.log(err)
  //     }
  //   );
  // }

  onUpdate(){}

  openDialog(id:number){
    const dialogRef = this.dialog.open(Dialoghtml, {
      data: {id: id}
    });
  }

  refresh() {
    this.userService.getUserList().subscribe((data: User[]) => {
      this.users = data;
    });
  }

}

@Component({
  selector: 'dialog-html',
  templateUrl: 'dialog.html'
})

export class Dialoghtml {

  constructor(public dialogRef: MatDialogRef<Dialoghtml>, @Inject(MAT_DIALOG_DATA)public data:DialogData, public userService:UserService) { }

  onDelete(data:any){
    alert(data)
    console.log(data)
    this.userService.delete(data.id).subscribe(
      res => {
        alert(res)
        console.log(res);
        // this.router.navigate(['/home']);
      },
      err => {
        console.log(err)
      }
    );
  }
  
}