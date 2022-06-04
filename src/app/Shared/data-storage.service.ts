import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { RecipeService } from "../recipes/Recipe.service";
import { Recipe } from "../recipes/recipe.module";
import { map, tap } from "rxjs/operators";
import { RecipesComponent } from "../recipes/recipes.component";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor (private HttpClient : HttpClient, private recipeService: RecipeService){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.HttpClient.put('https://the-recipe-project-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response =>{
            console.log(response)
        })
    }
    fetchData(){
        return this.HttpClient.get<Recipe[]>("https://the-recipe-project-default-rtdb.firebaseio.com/recipes.json")
        .pipe(map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []}
            })
        }),
        tap(recipes =>{
            this.recipeService.setRecipes(recipes)
        })
        
        )
        
    }
}