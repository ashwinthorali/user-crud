import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  constructor(public userService: UserService, public router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    // this.userService.postUser(form.value)
    //   .subscribe(data => {
    //     console.log(data);
    //   })
    this.userService.postUser(form.value).subscribe(
      res => {
        console.log(res);
        this.showSuccessMessage = true;
        console.log(this.showSuccessMessage);
        setTimeout(() => 
          this.showSuccessMessage = false, 4000);
        this.resetForm(form);
        this.router.navigate(['/signin']);
      },
      err => {
        alert(JSON.stringify(err));
        console.log(err);
        if (err.status === 422){
          this.serverErrorMessages = err.error.join('<br/>');
          console.log(this.serverErrorMessages);
        }
        else
          this.serverErrorMessages = 'Something went Wrong. Please Contact the Admin.';
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
