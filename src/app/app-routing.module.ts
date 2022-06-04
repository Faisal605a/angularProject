import { chainedInstruction } from "@angular/compiler/src/render3/view/util";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HeaderComponent } from "./header/header.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipeResolverService } from "./recipe-start/recipes-resolver.service";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipes/recipe-list/recipe-list.component";
import { Recipe } from "./recipes/recipe.module";
import { RecipesComponent } from "./recipes/recipes.component";
import { ShoppingListEditComponent } from "./shopping-list/shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const appRoute : Routes= [
    {path: '', redirectTo :'/recipes', pathMatch: 'full'}, 
    // {path: 'shopping-list', component: ShoppingListComponent ,children :[
    //     //{path : ':edit', component: ShoppingListEditComponent},
    // ]},
    {path: 'recipes', component: RecipesComponent, children : [
       {path: '', component: RecipeStartComponent},
       {path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
        {path: ':id/edit', component: RecipeEditComponent,resolve: [RecipeResolverService]}
        // {path: ':lits', component: RecipeListComponent},
        // {path: 'item', component: RecipeItemComponent}
    ]
    }
   , {path: 'shopping-list', component: ShoppingListComponent ,children :[
        //{path : ':edit', component: ShoppingListEditComponent},
    ]},

];
@NgModule({
    imports: [  RouterModule.forRoot(appRoute)
    ],
    exports: [RouterModule]
})

export class AppRoutingMoudle{

}