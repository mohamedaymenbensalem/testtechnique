import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CoreComponentComponent} from "./components/core-component/core-component.component";
import {EmployeModule} from "../employe/employe.module";



@NgModule({
  declarations: [
    CoreComponentComponent
  ],
  exports: [
    CoreComponentComponent
  ],
  imports: [
    CommonModule,
    EmployeModule
  ]
})
export class CoreModule { }
