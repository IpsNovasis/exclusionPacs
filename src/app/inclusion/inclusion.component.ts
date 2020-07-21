import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';

import { ApiExclusionService } from '../servicios/api-exclusion.service'

import { Inclusion } from '../models/inclusion';
import { Excluido } from '../models/excluido';
import { Exclusion } from '../models/exclusion';

@Component({
  selector: 'app-inclusion',
  templateUrl: './inclusion.component.html',
  styleUrls: ['./inclusion.component.css']
})
export class InclusionComponent implements OnInit {

  // FORMGROUP
  form: FormGroup;
  ordersData: Excluido[];
  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }
  // FORMGROUP

  public inclusion: Inclusion;
  public datafila: Excluido[];
  private exclusion: Exclusion = new Exclusion();

  textoincl: string;

  constructor(private apiExclusionService: ApiExclusionService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([])
    });
  }
  private addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  ngOnInit(): void {
    this.obtenerExclusion();
  }

  public obtenerExclusion(): void {
    let cperiodo = '202004'
    this.apiExclusionService.getExclusion(cperiodo)
      .subscribe(
        (orders) => {
          this.ordersData = orders.datos
          this.addCheckboxes();
          console.log(this.ordersData)
        },
        err => {
          console.log('error')
        }
      );
  }

  public InsertaEliminaInclusion(): void {

    this.apiExclusionService.InsDelInclusion(this.exclusion)
      .subscribe(exclusion => {
        console.log('Exclusion Eliminda y Movimiento Grabado')
      },
        err => {
          console.error('Codigo de Error desde el Backend InsertaEliminaInclusion: ', err.status);
        }
      );
  }

  submit() {
    console.log('texto exclusion : ', this.textoincl)
    const selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.ordersData[i].iRUN : null)
      .filter(v => v !== null);

    // console.log(selectedOrderIds, this.ordersData[1].iRUN) ;
    var k: number;
    for (k = 0; k < this.ordersData.length; k++) {
      if (this.form.value.orders[k]) {
        this.exclusion.iRUN = this.ordersData[k].iRUN;
        this.exclusion.cDV = this.ordersData[k].cDV;
        this.exclusion.vcCodigoUsuarioCreacion = 'jhbravo';
        this.exclusion.vcMensajeExclusion = this.textoincl;
        this.InsertaEliminaInclusion();
        console.log('Graba ', this.form.value.orders[k], 'rut: ', this.ordersData[k].iRUN, this.ordersData[k].cDV)
      }
    }
  }
}
