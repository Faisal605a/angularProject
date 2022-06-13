import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../Shared/shared.module";
import { ShoppingListEditComponent } from "./shopping-list-edit/shopping-list-edit.component";
import { ShoppingListComponent } from "./shopping-list.component";

@NgModule({
    declarations:[
        ShoppingListComponent,
        ShoppingListEditComponent
    ],
    imports:[
        SharedModule,
        FormsModule,
        RouterModule.forChild( [
            {path: '', component: ShoppingListComponent }
        ])
    ],
    exports: [
        ShoppingListComponent,
        ShoppingListEditComponent
    ]
})

export class ShoppingListModule{

}