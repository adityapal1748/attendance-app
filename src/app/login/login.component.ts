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
  
  }
  login(){
    this.service.getLoginData().subscribe((res:any) =>{
      //validate credentials
      const userFound = res.credentials.find((user:any) =>user.email === this.email.value && user.password === this.password.value)
      
      if(userFound){
        this.snackbar.open(`Welcome ${userFound.name}`,"",{
          duration:3000
        })
        //set the username in local storage
        localStorage.setItem('username',userFound.email)
        this.router.navigate(['attendance'])
      }else{  
        this.snackbar.open(`Invalid credentials`,"",{
          duration:3000
        })
      }
    })
  }
  

  


}
