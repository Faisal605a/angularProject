import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { alertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { loadingSpinnerComponent } from "./LodingSpinner/loading-spinner.component";
import { PlaceholderDirective } from "./PlaceHolder/PlaceHolder.component";


@NgModule({
    declarations: [
        alertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective
    ],
    imports: [
        CommonModule
    ],
    exports: [
        alertComponent,
        loadingSpinnerComponent,
        PlaceholderDirective,
        DropdownDirective,
        CommonModule
    ]
})
export class SharedModule{

}