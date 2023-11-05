import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private attendanceDataUrl = 'assets/employeeData.json'  
  constructor(private http:HttpClient) { }

  getLoginData():Observable<[]>{
    return this.http.get<[]>(this.attendanceDataUrl)
  }


}
