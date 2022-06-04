import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../Recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy{
  
   recipes : Recipe[]=[];
   sub: Subscription = new Subscription; 

   constructor(private recipeService: RecipeService,
               private router : Router,
               private route : ActivatedRoute){}

  ngOnInit() {
    this.sub =this.recipeService.recipeChanged.subscribe(
      (recipes : Recipe[]) =>{
        this.recipes = recipes

      }
    )
    this.recipes=this.recipeService.getRecipes();
  }
  OnNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route})
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
