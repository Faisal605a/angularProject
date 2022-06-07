import { Component, OnInit } from '@angular/core';
import { Event } from '@angular/router';
import { AuthService } from './auth/auth.service.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Course_project';
   
  
  constructor(private authService: AuthService){}
  
  ngOnInit(): void {
  this.authService.autoLogin();   
   }
 
}
