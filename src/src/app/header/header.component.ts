import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service.component';
import { RecipeService } from '../recipes/Recipe.service';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  implements OnInit,OnDestroy{
  @Input() featureSelected : string='';
  private userSub : Subscription | undefined;
   logedIn = false;

  constructor(private storageService: DataStorageService, private recipeService: RecipeService , private AuthService: AuthService) { }

  ngOnInit(): void {
     this.userSub= this.AuthService.user.subscribe(user => {
       //console.log("!!!!!!!"+user.id);
       this.logedIn= user.email.length>1;
     });
     
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe
  }
  Save(){
    this.storageService.storeRecipes();
  }
  logOut(){
    this.AuthService.singOut();

    //this.logedIn=false;
    
  }
  

  Fetch(){
    this.storageService.fetchData().subscribe();
  }
 
}
