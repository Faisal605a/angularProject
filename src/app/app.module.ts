import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { DropdownDirective } from './Shared/dropdown.directive';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutingMoudle } from './app-routing.module';
import { RecipeService } from './recipes/Recipe.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth/auth.component';
import { loadingSpinnerComponent } from './Shared/LodingSpinner/loading-spinner.component';
import { AuthInterceptoreService } from './auth/auth-interceptor.service.component';
import { alertComponent } from './Shared/alert/alert.component';
import { PlaceholderDirective } from './Shared/PlaceHolder/PlaceHolder.component';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingListModule } from './shopping-list/shopping-list.module';
import { SharedModule } from './Shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    HeaderComponent
  ],
  imports: [
    AppRoutingMoudle,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    SharedModule,
    ShoppingListModule
  ],

  providers: [ShoppingListService, RecipeService,{
    provide: HTTP_INTERCEPTORS,
     useClass : AuthInterceptoreService,
     multi: true}],
  bootstrap: [AppComponent],
  // entryComponents:[
  //   alertComponent
  // ]
})
export class AppModule { }
