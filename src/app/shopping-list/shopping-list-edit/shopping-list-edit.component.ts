import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/Shared/ingredient.model';
import { ShoppingListService } from '../shoppingList.service';

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit , OnDestroy{
  @Output() inge = new EventEmitter<Ingredient>();
  @ViewChild('f') ShoppingForm: NgForm | undefined;
  subscribction : Subscription | undefined;
  editMode = false;
  editItemId =0;
  editedItem : Ingredient | undefined;
  constructor(private shoppingListService : ShoppingListService) {
   }

  ngOnInit(): void {
    this.subscribction =this.shoppingListService.
    startedEditingChanged.
    subscribe(
      (id : number) => {

        this.editItemId = id;
        this.editMode = true;
        this.editedItem = this.shoppingListService.getIngredintwithID(this.editItemId);
        console.log("Name: "+ this.editedItem.name+ " amount : "+ this.editedItem.amount)
        this.ShoppingForm?.setValue({
         name :  this.editedItem.name,
         amount : this.editedItem.amount
        })
      }
    );
   
     

      

    
  }
  onDelete(){
    if(this.editMode){
      this.shoppingListService.deleteIngerdient(this.editItemId);
    this.onClear();
    }
  }
  onClear(){
    this.ShoppingForm?.reset();
    this.editMode=false;
  }
  // addIngerdints(Ingrdint : string, amount : number){
  //  const ing =new Ingredient(Ingrdint, amount);
  //   this.shoppingListService.addIngerdient(ing);
  // }
  onAddItem(form : NgForm){
    const value = form.value;
    if(this.editMode){
      this.shoppingListService.updateIngerdient(this.editItemId, value.name, value.amount);
      this.editMode=false;
      
    }
    else{
    const newIngerdient = new Ingredient(value.name, value.amount);
    this.shoppingListService.addIngerdient(newIngerdient);
    }
    this.ShoppingForm?.reset();
  }

  
  ngOnDestroy(): void {
    this.subscribction?.unsubscribe();
  }
}
