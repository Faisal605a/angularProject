import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListService } from './shopping-list/shoppingList.service';
import { AppRoutingMoudle } from './app-routing.module';
import { RecipeService } from './recipes/Recipe.service';
import { AuthInterceptoreService } from './auth/auth-interceptor.service.component';
import { SharedModule } from './Shared/shared.module';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    HttpClientModule,
    AppRoutingMoudle,
    BrowserModule,
    SharedModule,
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
