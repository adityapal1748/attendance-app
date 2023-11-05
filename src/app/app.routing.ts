import { NgModule } from "@angular/core";
import { Routes,RouterModule } from "@angular/router";
import { AttendanceDetailsComponent } from "./attendance-details/attendance-details.component";
import { CanActivateGuard } from "./guard";
import { LoginComponent } from "./login/login.component";

const appRoutes: Routes =[
    // 
    {path:'', component:LoginComponent},
    {path:"attendance",component:AttendanceDetailsComponent,canActivate:[CanActivateGuard]},
    // {path:'not-found',component:LoginComponent},
    {path:'**',redirectTo:""}
]


@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule{

}