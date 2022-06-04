import { partitionArray } from '@angular/compiler/src/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.module';
import { RecipeService } from '../Recipe.service';
import { RecipesComponent } from '../recipes.component';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
 
  recipeForm!: FormGroup;
  id : number =0;
  editMode = false;
  constructor(private  route : ActivatedRoute,
     private recipeService : RecipeService,
     private router : Router) { }

  ngOnInit() {
    this.route.params 
    .subscribe (
      (params: Params ) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
       this.initForm();

      }

    )
  }
  get controls(){
    return ( <FormArray>this.recipeForm.get('ingredients')).controls;
  }
  onSubmit(){
    
    if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value );
    }else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onFinsh();
     }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }
  onDeleteIngredient(index : number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
  onFinsh(){
    this.router.navigate(["../"], {relativeTo: this.route });
  }
  private initForm() {
   
    let recipeName ='';
    let recipeImagePath ='';
    let recipeDesctiption= '';
    let recipeIngerdient = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName=recipe.name;
      recipeImagePath=recipe.imagePath;
      recipeDesctiption=recipe.description;
      if(recipe['ingredients']){
        for (let ingerdient of recipe.ingredients){

          recipeIngerdient.push(
            new FormGroup({
              'name' : new FormControl(ingerdient.name, Validators.required),
              'amount': new FormControl(ingerdient.amount,[
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }
   this.recipeForm = new FormGroup({
     'name' : new FormControl(recipeName, Validators.required),
     'imagePath': new FormControl(recipeImagePath, Validators.required),
     'description': new FormControl(recipeDesctiption, Validators.required),
     'ingredients' :  recipeIngerdient
   }) 
  }

}
