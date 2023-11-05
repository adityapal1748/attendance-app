import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { format, isSameDay } from 'date-fns';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-attendance-details',
  templateUrl: './attendance-details.component.html',
  styleUrls: ['./attendance-details.component.css']
})
export class AttendanceDetailsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'punchIn', 'punchOut', 'status', 'duration'];
  dataSource: any = new MatTableDataSource([]);
  punchInBtn: boolean = false
  punchOutBtn: boolean = true
  username!: string | null;

  constructor(private service: EmployeeService) { }
  ngOnInit() {
    this.getUserData()
    this.username = localStorage.getItem('username')
  }
  getUserData() {
    this.service.getLoginData().subscribe((res: any) => {
      //find the user and its attendace details
      let userData = res?.attendanceData.find((el: any) => el.user == this.username)

      this.dataSource = new MatTableDataSource(userData.attendance) //update the datasource

      userData.attendance.forEach((element: any) => {
        let startDate: any = new Date(element.date);
        let currentDate: any = new Date()
        //check if the user is punched in for the current date and enable the btn
        if (isSameDay(startDate, currentDate)) {
          this.punchInBtn = true
        }

      });
    })
  }
  punchIn() {
    let payload = {
      date: new Date(),
      punchIn: format(new Date(), 'HH:mm:ss'),
      punchOut: "",
      status: "prs"
    }
    this.dataSource.data.push(payload)
    this.dataSource = new MatTableDataSource(this.dataSource.data); // Reassign the data source
    this.punchInBtn = true
    this.punchOutBtn = false
  }
  punchOut() {
    //add the punchout time and update the datasource
    this.dataSource.data[this.dataSource.data.length - 1].punchOut = format(new Date(), 'HH:mm:ss')
    this.dataSource = new MatTableDataSource(this.dataSource.data)
    this.punchOutBtn = true
    let time = this.dataSource.data[this.dataSource.data.length - 1]

    //get the duration for which the employee punched in and out
    this.dataSource.data[this.dataSource.data.length - 1].duration = this.subtractTimes(time.punchIn, time.punchOut)
    this.dataSource = new MatTableDataSource(this.dataSource.data)
    this.punchOutBtn = true

  }
  subtractTimes(time1: any, time2: any) {

    const time1Parts = time1.split(':');
    const time2Parts = time2.split(':');

    // Convert times to seconds
    const time1Seconds = (+time1Parts[0]) * 3600 + (+time1Parts[1]) * 60 + (+time1Parts[2]);
    const time2Seconds = (+time2Parts[0]) * 3600 + (+time2Parts[1]) * 60 + (+time2Parts[2]);

    // Calculate the difference in seconds
    let timeDifference = time2Seconds - time1Seconds;

    // Handle negative differences (if time1 is greater than time2)
    if (timeDifference < 0) {
      timeDifference += 24 * 3600; // Assuming it's within a 24-hour period
    }

    // Convert the difference back to HH:mm:ss format
    const hours = Math.floor(timeDifference / 3600);
    const minutes = Math.floor((timeDifference % 3600) / 60);
    const seconds = Math.floor(timeDifference % 60);

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  


}
