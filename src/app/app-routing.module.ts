
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "./auth/auth.component";
import { ShoppingListComponent } from "./shopping-list/shopping-list.component";


const appRoute : Routes= [
    {path: '', redirectTo :'/recipes', pathMatch: 'full'}, 
    // {path: 'shopping-list', component: ShoppingListComponent ,children :[
    //     //{path : ':edit', component: ShoppingListEditComponent},
    // ]},
    
   
     { path: 'auth' , component: AuthComponent}

];
@NgModule({
    imports: [  RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})

export class AppRoutingMoudle{

}