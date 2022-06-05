import {  Injectable,  } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shoppingList.service";
import { Recipe } from "./recipe.module";

@Injectable()
export class RecipeService  {
  recipeChanged =new Subject<Recipe[]>();

  ngOnInit(): void {
      console.log("Hello war!!")
  }
  
  private recipes: Recipe[] = [];
      

      constructor(private shoppingListService: ShoppingListService){}

      getRecipes(){

          return this.recipes.slice();
      }
      getRecipe(index : number){
        return this.recipes[index];
      }

      setRecipes(recipe: Recipe[]){
        this.recipes = recipe;
        this.recipeChanged.next(this.recipes.slice());
      }
     
      addIngerdientToShoppingList(ingerdient: Ingredient[]){
       this.shoppingListService.addIngredients(ingerdient);
      }
      addRecipe( recipe : Recipe){
        this.recipes.push(recipe);
        this.recipeChanged.next(this.recipes.slice());

      }
      updateRecipe(index : number , recipe : Recipe ){
        this.recipes[index]=recipe;
        this.recipeChanged.next(this.recipes.slice());
      }
      deleteRecipe(index : number){
        this.recipes.splice(index,1);
        this.recipeChanged.next(this.recipes.slice());
      }
}