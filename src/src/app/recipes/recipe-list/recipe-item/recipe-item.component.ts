
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../../recipe.module';
import { RecipeService } from '../../Recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  
  @Input() currentRecipe =  new Recipe("", "","",[])  ;
  @Input() recipeId : number=0 ;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
  }
 
}
