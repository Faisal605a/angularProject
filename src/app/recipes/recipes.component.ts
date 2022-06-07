import { Component} from '@angular/core';
import { Recipe } from './recipe.module';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {
  

  constructor() { }

 
  
  //   debug(rec : Recipe){
  //     console.log("recipe : "+ rec.name)
  // }
  // // recipeNaming(recNamea : Recipe ){
  //   this.recName.emit(recNamea);
  // }
}
