import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {GestioneEmplService} from "../../service/gestione-empl.service";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {Employe} from "../../models/employe";

@Component({
  selector: 'app-list-employ',
  templateUrl: './list-employ.component.html',
  styleUrls: ['./list-employ.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListEmployComponent implements OnInit {

  constructor(private servicegestionEmp:GestioneEmplService) {



  }

  data$ = new Observable<any>;
  mesEmps:any;

  employes$!: Observable<Employe[]>;

  loading$!: Observable<boolean>;


  EvenementType !:string;

  ngOnInit(): void {



   this.initObservables();


    /// recu
    this.mesEmps=this.servicegestionEmp.getEmplfromSesionStorage()





  // console.log(obj)






  }


  private initObservables() {
    this.loading$ = this.servicegestionEmp.loading$;
    this.employes$ = this.servicegestionEmp.employes$;
  }


  onAction($event: string) {

    this.EvenementType=$event

  }

  onSave() {
   // this.servicegestionEmp.save()

console.log(this.EvenementType)
    this.servicegestionEmp.save('ajout');


  }

  onCancel( onEvenement :'modification'|'ajout' |null) {
   if (onEvenement){
     this.servicegestionEmp.cancel(onEvenement);
     onEvenement=null
   }
  }


  onDelete( id:Number){
    this.servicegestionEmp.deletEmpl(id);
  }


}
