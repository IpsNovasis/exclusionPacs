import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiExclusionService } from '../servicios/api-exclusion.service'
import { Elegibilidad } from '../models/elegibilidad';
import { Pensionado } from '../models/pensionado';
import { Exclusion } from '../models/exclusion';
import { Filtroelegibilidad } from '../parameter/filtroelegibilidad';

@Component({
  selector: 'app-exclusion',
  templateUrl: './exclusion.component.html',
  styleUrls: ['./exclusion.component.css']
})
export class ExclusionComponent implements OnInit {


  
  selegibilidad =  0;
  sentidad =  0;
  scapredena =  0;
  sdipreca =  0;
  sips = 0


  
public soption: string[];

  public elegibilidad: Elegibilidad;
  public datafila: Pensionado[];
  private exclusion: Exclusion = new Exclusion();
  public filtroelegibilidad: Filtroelegibilidad = new Filtroelegibilidad();


  constructor(private apiExclusionService: ApiExclusionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    console.log('inicio');

    this.filtroelegibilidad.iCodigoTipoElegibilidad = 3;
    this.filtroelegibilidad.vcEntidadPagadora = '3';
    this.filtroelegibilidad.cBonoReconocimientoCAPREDENA = '3';
    this.filtroelegibilidad.cBonoReconocimientoDIPRECA = '3';
    this.filtroelegibilidad.cBonoReconocimientoIPS = '3';

    this.ObtenerfiltroElegibilidad();

    console.log('Insercion de exclusion rut 9')
    this.exclusion.iRUN = 40601;
    this.exclusion.cDV = '5';
    this.exclusion.cPeriodo = '202006';
    this.exclusion.vcCodigoUsuarioCreacion = 'Jhbravoa';
    this.exclusion.vcMensajeExclusion = 'Mensaje de Prueba en presentacion';
  //  this.InsertaExclusion();
    console.log('Fin Insercion de exclusion rut 9');
  }
 
  public ObtenerfiltroElegibilidad(): void {

    this.apiExclusionService.getFiltroElegibilidad(
      this.selegibilidad,
      this.sentidad,
      this.scapredena,
      this.sdipreca,
      this.sips
    ).subscribe(
      (elegibilidad) => {
        this.datafila = elegibilidad.datos
        console.log(this.datafila)
      },
      err => {
        console.log('error filtroElegibilidad');
      
     
      }
    );
  }

  public InsertaExclusion(): void {
    this.apiExclusionService.insertExclusion(this.exclusion)
      .subscribe(exclusion => {
        console.log('Exclusion registrada')
      },
        err => {
          console.error('Codigo de Error desde el Backend InsertaExclusion: ', err.status);
        }
      );
  }
  search() {
    console.log('presiono search soption', this.soption)

    this.ObtenerfiltroElegibilidad()
  }

  exclution(){
    console.log('excluye');
  }

}
