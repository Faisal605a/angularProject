import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
       this.logedIn= !!user
     });
     
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe
  }
  Save(){
    this.storageService.storeRecipes();
  }

  Fetch(){
    this.storageService.fetchData().subscribe();
  }
 
}
