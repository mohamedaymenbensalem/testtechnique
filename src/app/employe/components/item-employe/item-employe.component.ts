import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ThisReceiver} from "@angular/compiler";
import {GestioneEmplService} from "../../service/gestione-empl.service";
import {Employe} from "../../models/employe";

@Component({
  selector: 'app-item-employe',
  templateUrl: './item-employe.component.html',
  styleUrls: ['./item-employe.component.scss']
})
export class ItemEmployeComponent implements OnInit {



  @Input()EmpObj  !: Employe;
  @Output() newEmp = new EventEmitter<string>();

  @Input() type !:'compAjout'  | 'compfils' ;

  name !:string;
  prenom !: string;

  nbenfant !: number;
TypeEmp !: string ;



  emplForm!: FormGroup;

  contactNomCtrl!: FormControl;
  contactPrenomCtrl!: FormControl;

  contactNbEnfant!:FormControl;


  contactnomRegex!: RegExp;




  constructor(private formBuilder: FormBuilder,private serviceGestioonEmp:GestioneEmplService) { }

  ngOnInit(): void {
    this.TypeEmp=this.type;
    this.contactnomRegex=/^[A-Za-z]+$/;
    this.initForm();
    if((this.EmpObj)){

      this.name=this.EmpObj.name;
      this.prenom=this.EmpObj.surName
      this.nbenfant=this.EmpObj.children;
    }
    else {
      this.name='';
      this.prenom='';
      this.nbenfant=0;

    }



  }



  private initForm() {


    this.contactNomCtrl=this.formBuilder.control(null,[Validators.required,Validators.pattern(this.contactnomRegex)]);
    this.contactPrenomCtrl=this.formBuilder.control(null,[Validators.required,Validators.pattern(this.contactnomRegex)]);
    this.contactNbEnfant=this.formBuilder.control(null,[Validators.required,Validators.max(8),Validators.min(0)

    ]);


    this. emplForm = this.formBuilder.group({

        nom:this.contactNomCtrl,
        prenom:this.contactPrenomCtrl,
        nbEnfants:this.contactNbEnfant,

      }


    );

  }

  incrEnfant() {

        if((this.nbenfant<10) || (this.nbenfant>=0))
    {
      this.contactNbEnfant.setValue(this.nbenfant);
      this.nbenfant++;
    }

        return;

  }

  decrEnfant() {

    if((this.nbenfant<10) ||(this.nbenfant>=0))
    {
      this.contactNbEnfant.setValue(this.nbenfant);
      this.nbenfant--;
    }

    return;

  }


  onLeaveEmpl() {

    if (this.emplForm.invalid) {
      return;
    }
    this.newEmp.emit('ajout');

    console.log(this.emplForm.controls['nom'].value)

    let Emp= new Employe();
    Emp.id=5;
    Emp.name= this.emplForm.controls['nom'].value;
    Emp.surName=this.contactPrenomCtrl.value;
    Emp.children=this.contactNbEnfant.value;



    console.log(Emp)
    this.serviceGestioonEmp.addEmploye(Emp);
      this.emplForm.reset();


  }


  deleteEmp(id:Number) {
    this.serviceGestioonEmp.deletEmpl(id);
  }
}
