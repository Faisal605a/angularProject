import { EventEmitter } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../Shared/ingredient.model";

export class ShoppingListService {

    ingeredientChanged = new Subject<Ingredient[]>();
    startedEditingChanged = new Subject<number>();
    private  ingredients : Ingredient[] = [
        new Ingredient("Appels",5) ,
        new Ingredient("Tomaeto",9),
        new Ingredient ("Onien", 6)
      ];


      addIngerdient(newIngerdint : Ingredient){
        this.ingredients.push(newIngerdint);
        this.ingeredientChanged.next(this.ingredients.slice());
      }
      addIngredients(ingerdients : Ingredient[]){
        //   for(let ingerdient of ingerdients) {
        //       this.addIngerdient(ingerdient);
        //   }
        this.ingredients.push(...ingerdients);
        this.ingeredientChanged.next(this.ingredients.slice());
      }
      getIngredients(){
          
          return this.ingredients.slice();
      }
      getIngredintwithID(id: number){
        return this.ingredients[id];
      } 
     updateIngerdient(id: number, name :  string, amount : number){
      this.ingredients[id].name=name;
      this.ingredients[id].amount=amount;

     }
     deleteIngerdient(id:number ){
     this.ingredients.splice(id,1);
       
       for(let pp of this.ingredients ){
         console.log("Name: "+ pp.name+" Amount: "+ pp.amount);
       }
       this.ingeredientChanged.next(this.ingredients.slice())

     }
}