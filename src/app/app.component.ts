import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'attendance-app';
  data:any =""
  constructor(private router:Router){}
  ngOnInit(): void {
    this.data = localStorage.getItem('username')
  }
  

  logout(){
    localStorage.clear()   //clear the session and navigate the user to the login page
    this.router.navigate([''])
  }
}
