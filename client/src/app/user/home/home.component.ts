import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user.model';
import { UserService } from 'src/app/shared/user.service';

export interface DialogData {
  element: any;
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
  update: boolean;


  constructor(public userService:UserService, public router:Router, public dialog:MatDialog) { }

  ngOnInit(): void {
    // const response_user = this.userService.getUserList();
    // alert(JSON.stringify(response_user));
    // response_user.subscribe((data:User[])=>{
    //   this.users = data;
    //   console.log('printing ' + this.users);
    // });
    // this.userService.getUserList().subscribe((data:User[])=>{
    //   this.users = data;
    //   console.log('printing ' + this.users);
    // });
    // this.displayedColumns = ['name', 'email', 'update', 'delete'];
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

  openDialog(element:any){
    const dialogRef = this.dialog.open(Dialoghtml, {
      data: {element: element}
    });
    this.update = false;
  }

  openupdate(element:any){
    const dialogRef = this.dialog.open(DialogUpdate, {
      data: {element: element}
    });
    this.update = true;
  }

  refresh() {
    this.userService.getUserList().subscribe((data: User[]) => {
      this.users = data;
      this.displayedColumns = ['name', 'email', 'update', 'delete'];
    });
  }

}

@Component({
  selector: 'dialog-html',
  templateUrl: 'dialog.html'
})

export class Dialoghtml {
  users: User[];
  displayedColumns: string[];


  constructor(public dialogRef: MatDialogRef<Dialoghtml>, @Inject(MAT_DIALOG_DATA)public data:DialogData, public userService:UserService) { }

  onDelete(data:any){
    this.userService.delete(data.element._id).subscribe(
      res => {
        this.refresh();
      },
      err => {
        console.log(err)
      }
    );
  }

  refresh() {
    alert('hi');
    this.userService.getUserList().subscribe((data: User[]) => {
      this.users = data;
      this.displayedColumns = ['name', 'email', 'update', 'delete'];
    });
  }
  
}

@Component({
  selector: 'dialog-update',
  templateUrl: 'dialog-update.html'
})

export class DialogUpdate {

  constructor(public dialogRef: MatDialogRef<DialogUpdate>, @Inject(MAT_DIALOG_DATA)public data:DialogData, public userService:UserService, public dialog:MatDialog) { }

  onUpdate(data: any){
    debugger
    console.log(data);
    // alert(JSON.stringify(form.value.fullName));
    // alert(JSON.stringify(form.value.email));

    this.userService.update(data).subscribe(
      res => {
        console.log(res)
      },
      err => {
        console.log(err)
      }
    );
  }

} 