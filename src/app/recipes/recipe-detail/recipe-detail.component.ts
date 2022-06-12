import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shoppingList.service';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../Recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
@Input() recipe= new Recipe("", "", "",[]);
  id : number =0;


  constructor(
    private recipeService : RecipeService,
    private route : ActivatedRoute,
    private router : Router) { }

  ngOnInit(): void {
    this.route.params
     .subscribe(
       (params : Params)=> {
         this.id = +params['id'];
         this.recipe = this.recipeService.getRecipe(this.id);
       }
     )
  }
  recipeNameing( name : string){

  }
  onAddToShoppingList(){
    this.recipeService.addIngerdientToShoppingList(this.recipe.ingredients);
  }
  onEditRecipe(){
      this.router.navigate(['edit'], {relativeTo: this.route})

    
  }
 
  onDelete(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}
