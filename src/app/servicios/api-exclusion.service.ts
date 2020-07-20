import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

import { Elegibilidad} from '../models/elegibilidad';
import { Inclusion } from '../models/inclusion';
import { Exclusion } from '../models/exclusion';
import { Filtroelegibilidad } from '../parameter/filtroelegibilidad';
import { analyzeNgModules } from '@angular/compiler';
 
@Injectable({
  providedIn: 'root'
})
export class ApiExclusionService {

  private urlEleCon: string = environment.urlEleCon;
  private urlExcCon: string = environment.urlExcCon;
  private urlExcIns: string = environment.urlExcIns;
  
  private httpHeaders = new HttpHeaders({ 'content-type': 'application/json' });

  private filtroelegibilidad = new Filtroelegibilidad();
 
  constructor(private http: HttpClient, private router: Router) { }

  // Lee tabla de elegibilidad con filtro de selección
  getFiltroElegibilidad(iCodigoTipoElegibilidad, vcEntidadPagadora, cBonoReconocimientoCAPREDENA,
    cBonoReconocimientoDIPRECA, cBonoReconocimientoIPS): Observable<Elegibilidad>{ 
    return this.http
    .get<Elegibilidad>(`${this.urlEleCon}/${iCodigoTipoElegibilidad}/${vcEntidadPagadora}/${cBonoReconocimientoCAPREDENA}/${cBonoReconocimientoDIPRECA}/${cBonoReconocimientoIPS}`, { headers: this.httpHeaders})
    .pipe(
      catchError((err) => {
        console.log(err.return.message);
        console.error(err.return.message, 'code : 400,getSelElegibilidad');
        this.router.navigate(['/error']);
        return throwError(err);
      })
    );
  }

  // Trae los datos de excluidos para presentar en pantalla de inclusión
  getExclusion(periodo): Observable<Inclusion>{
    return this.http
    .get<Inclusion>(`${this.urlExcCon}/${periodo}`, { headers: this.httpHeaders })
    .pipe(
      catchError((err) => {
        console.log(err.return.message);
        console.error(err.return.message, 'code : 400, getExclusion');
        this.router.navigate(['/error']);
        return throwError(err);
      })
    );
  }

  // Inserta en tabla tblPACSExclusionConcesion
  insertExclusion(exclusion: Exclusion): Observable<Exclusion> {
    return this.http.post<Exclusion>(this.urlExcIns, exclusion, { headers: this.httpHeaders }).pipe(
      map( (response:any) => response.exclusion as Exclusion),
      catchError(e => {
        if(e.status==400){
          console.error(e.error.mensaje, 'code : 400, insertExclusion');
          return throwError(e);
        }
        console.error(e.error.mensaje);
        return throwError(e);
      })
    );
  }

}
