import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "src/app/auth/auth.guard";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipesComponent } from "./recipes.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipe-start/recipes-resolver.service";


const recipeRouter : Routes= [
    {path: '',
    component: RecipesComponent,
    canActivate : [AuthGuard],
    children : [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent},
       {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
       {path: ':id/edit', component: RecipeEditComponent,resolve: [RecipeResolverService]}
       // {path: ':lits', component: RecipeListComponent},
       // {path: 'item', component: RecipeItemComponent}
   ]
   }
]

@NgModule({
    imports: [ RouterModule.forChild(recipeRouter)],
    exports: [RouterModule]
})
export class RecipesRoutingMoudle{}