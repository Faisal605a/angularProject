import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { RecipeService } from "../recipes/Recipe.service";
import { Recipe } from "../recipes/recipe.module";
import { map, take, tap } from "rxjs/operators";
import { RecipesComponent } from "../recipes/recipes.component";
import { AuthService } from "../auth/auth.service.component";

@Injectable({providedIn:'root'})
export class DataStorageService{

    constructor (private HttpClient : HttpClient, private recipeService: RecipeService, private AuthService: AuthService){
    }

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();
        this.HttpClient.put('https://the-recipe-project-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response =>{
            console.log(response)
        })
    }
    fetchData(){
        this.AuthService.user.pipe(take(1))
        return this.HttpClient
        .get<Recipe[]>(
            "https://the-recipe-project-default-rtdb.firebaseio.com/recipes.json"
            )
    .pipe(
        map(recipes => 
        {
        return recipes.map(recipe => {
            return {
                ...recipe,
                 ingredients: recipe.ingredients ? recipe.ingredients : []};
        });
    }),
            
    tap(recipes =>{
            this.recipeService.setRecipes(recipes)
        })
        
        )

    }
}