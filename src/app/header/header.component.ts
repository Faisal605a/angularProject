import { Component, Input, Output } from '@angular/core';
import { RecipeService } from '../recipes/Recipe.service';
import { DataStorageService } from '../Shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent  {
  @Input() featureSelected : string='';
  constructor(private storageService: DataStorageService, private recipeService: RecipeService ) { }


  Save(){
    this.storageService.storeRecipes();
  }

  Fetch(){
    this.storageService.fetchData().subscribe();
  }
 
}
