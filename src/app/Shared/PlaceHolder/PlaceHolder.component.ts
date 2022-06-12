import { Directive, ViewContainerRef } from "@angular/core";

@Directive({
    selector:'[appPlacewholder]'
})
export class PlaceholderDirective{
    constructor(public viewContinerRef: ViewContainerRef){}
}