import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ListEmployComponent} from "./components/list-employ/list-employ.component";
import {ItemEmployeComponent} from "./components/item-employe/item-employe.component";
import { ModifEmployeComponent } from './components/modif-employe/modif-employe.component';



@NgModule({
  declarations: [
    ItemEmployeComponent,
    ListEmployComponent,
    ModifEmployeComponent
  ],
  exports: [
    ItemEmployeComponent,
    ListEmployComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule
    ]
})
export class EmployeModule { }
