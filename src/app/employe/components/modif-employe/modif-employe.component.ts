import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GestioneEmplService} from "../../service/gestione-empl.service";
import {map, Observable, tap} from "rxjs";
import {Employe} from "../../models/employe";

@Component({
  selector: 'app-modif-employe',
  templateUrl: './modif-employe.component.html',
  styleUrls: ['./modif-employe.component.scss']
})
export class ModifEmployeComponent  implements  OnInit {


  @Output() modifEmp = new EventEmitter<'modification'>();


arrive !: Observable<Employe>;

  Empmodif$ !: Observable <Employe>;


  constructor(private formBuilder: FormBuilder, private serviceGestioonEmp: GestioneEmplService) {
  }

  emplForm!: FormGroup;

  contactNomCtrl!: FormControl;
  contactPrenomCtrl!: FormControl;




  contactnomRegex!: RegExp;


  ngOnInit(): void {
    this.initForm();
    this.initObservable();
    this.arrive=this.serviceGestioonEmp.getEmpbyId();

  }





  private initForm() {


    this.contactNomCtrl=this.formBuilder.control(null,[Validators.required,Validators.pattern(this.contactnomRegex)]);
    this.contactPrenomCtrl=this.formBuilder.control(null,[Validators.required,Validators.pattern(this.contactnomRegex)])
   // this.contactNbEnfant=this.formBuilder.control(null,[Validators.required,Validators.max(8),Validators.min(0)



    this. emplForm = this.formBuilder.group({

        nom:this.contactNomCtrl,
        prenom:this.contactPrenomCtrl,



      }

      , {
       updateOn: 'blur'
      }


    );

  }



  onLeaveModification() {

    if (this.emplForm.invalid) {
      return;
    }

    this.modifEmp.emit('modification');
    this.emplForm.reset();
   // this.serviceGestioonEmp.addEmploye();
  }


  initObservable(){

    this.Empmodif$ = this.emplForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id:5,

        children:6


      })),
      tap(

        (val)=>{console.log(val);




        }

      )
    );





  }



}
