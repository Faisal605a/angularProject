import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { Recipe } from "../recipe.module";
import { RecipeService } from "../Recipe.service";
import { DataStorageService } from "../../Shared/data-storage.service";


@Injectable({providedIn:'root'})
export class RecipeResolverService implements Resolve<Recipe []>{

    constructor(private dataStorgeService : DataStorageService, private recipeSerice : RecipeService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        const recipes = this.recipeSerice.getRecipes();

        if (recipes.length<=0){
       return this.dataStorgeService.fetchData();
        }
         return recipes;
    }
}