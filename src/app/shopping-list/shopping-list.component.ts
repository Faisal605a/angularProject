import { Component, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../Shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],

})
export class ShoppingListComponent implements OnInit, OnDestroy {
 ingeredient : {name : string, amount: number}[]=[];
 private activeIng =new  Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
   
    this.ingeredient=this.shoppingListService.getIngredients();
   this.activeIng=this.shoppingListService.ingeredientChanged.subscribe(
      (ingerdinets : Ingredient[]) => {
        this.ingeredient= ingerdinets;
      } 
    )
      
  }
  onEditIem(id : number){
    
    this.shoppingListService.startedEditingChanged.next(id);
  }
  ngOnDestroy(): void {
      this.activeIng.unsubscribe();
  }
  
}
