import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = new FormControl('')
  password = new FormControl('')
  hide:boolean = true;
  userData:[] = []
  selectedDate:any
  constructor(private service:EmployeeService,private router:Router,private snackbar:MatSnackBar){
   this.service.getLoginData().subscribe(res =>console.log(res))
  }
  login(){
    this.service.getLoginData().subscribe((res:any) =>{
      const userFound = res.credentials.find((user:any) =>user.email === this.email.value && user.password === this.password.value)
      console.log(userFound)
      if(userFound){
        console.log("userfounf");
        this.snackbar.open(`Welcome ${userFound.name}`,"",{
          duration:3000
        })
        localStorage.setItem('username',userFound.email)
        this.router.navigate(['attendance'])
      }else{
        console.log("not found");  
        this.snackbar.open(`Invalid credentials`,"",{
          duration:3000
        })
      }
    })
  }
  

  


}
