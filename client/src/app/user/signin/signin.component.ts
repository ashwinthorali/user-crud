import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [UserService]
})
export class SigninComponent implements OnInit {
  showSuccessMessage: boolean;
  serverErrorMessages: string;

  constructor(public userService:UserService, public router:Router, public toastr:ToastrService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    // this.userService.postUser(form.value)
    //   .subscribe(data => {
    //     console.log(data);
    //   })
    debugger
    this.userService.login(form.value).subscribe(
      res => {
        alert(JSON.stringify(res));
        console.log(res);
        this.router.navigate(['/home/']);
        this.resetForm(form);
        this.toastr.success("signed in successfully");
      },
      err => {
        alert(JSON.stringify(err));
        console.log(err);
        this.router.navigate(['/signin/']);
        this.resetForm(form);
      }
    );
  }

  resetForm (form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }


}
