import { Injectable } from '@angular/core';
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {BehaviorSubject, delay, map, Observable, switchMap, take, tap} from "rxjs";
import {Employe} from "../models/employe";

@Injectable({
  providedIn: 'root'
})
export class GestioneEmplService {

obj !:any;

  private _employes$ = new BehaviorSubject<Employe[]>([]);

  private _loading$ = new BehaviorSubject<boolean>(false);

  private tabEmp=

    [
      {
        "id": 1,
        "name": "User One",
        "surName": "user1",
        "children": 2
      },
      {
        "id": 2,
        "name": "User Two",
        "surName": "user2",
        "children": 5
      },
      {
        "id": 3,
        "name": "User Three",
        "surName": "user3",
        "children": 5
      }
    ]
  ;
  private t: any;
  private data$ !: Observable<any>;





  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }


  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }


  get employes$(): Observable<Employe[]> {
    return this._employes$.asObservable();
  }





  constructor() { }



  getEmplfromSesionStorage(){



      localStorage.setItem('employes',JSON.stringify(this.tabEmp));

    this.t = localStorage.getItem('employes')

     this.obj= JSON.parse(this.t);

    this.data$ = new Observable(observer => {
      observer.next(this.obj)
      observer.complete();
      observer.error();


    })

    this.setLoadingStatus(true);
    this.data$.pipe(

      delay(1000),
      tap(
        (vals)=>{
          this._employes$.next(vals);
          this.setLoadingStatus(false);
        }

      )

    ).subscribe()



  }


  addEmploye(emp: Employe){

    this.setLoadingStatus(true);
    localStorage.setItem('employes',JSON.stringify(this.tabEmp));
    this.t = localStorage.getItem('employes')
    this.obj= JSON.parse(this.t);
    this.data$ = new Observable(observer => {
      observer.next(this.obj)
      observer.complete();
      observer.error();
    })
    this.setLoadingStatus(true);
    this.data$.pipe(
      delay(500),
      tap(
        (vals)=>{

          const x=vals.slice( );
            x.push(emp)
          this._employes$.next(x);
          this.setLoadingStatus(false);
        }

      )

    ).subscribe()






  }



  save(typeAction :'ajout' | 'modification'){


    if(typeAction=='ajout'){}

    if (typeAction=='modification'){}




  }

  cancel(typeAction: "modification" | "ajout" | " "){

     if(typeAction === 'ajout')   {




       this.setLoadingStatus(true);
       this.data$.pipe(
         delay(500),
         tap(
           (vals)=>{

             this._employes$.next(vals);
             this.setLoadingStatus(false);
           }

         )

       ).subscribe()



     }

     if (typeAction=='modification') {}




  }



  modifEmp(){



    this.data$.pipe(
      delay(500),
      tap(
        (vals)=>{


          const x=vals.slice( );
          x.push({
            "id": 4,
            "name": "User One",
            "surname": "user1",
            "children": 2
          })
          this._employes$.next(x);
          this.setLoadingStatus(false);
        }

      )

    ).subscribe()








  }


  deletEmpl(id: Number){



    this.data$.pipe(

      map(emps => emps.filter((temps:any) => temps.id !== id)),


      tap(
        (vals)=>{

          this._employes$.next(vals);

          this.tabEmp=this.tabEmp.filter((temps:any) => temps.id !== id)

           this.getEmplfromSesionStorage();

        }

      )

    ).subscribe();






  }


  getEmpbyId():Observable<Employe>{

    return this.data$.pipe(
      map(emp => emp.filter((emp:any) => emp.id === 2)[0])
    );

  }

}
