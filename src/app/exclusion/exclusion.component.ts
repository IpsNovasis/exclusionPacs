import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormArray, FormControl, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2'

import { ApiExclusionService } from '../servicios/api-exclusion.service'
import { Elegibilidad } from '../models/elegibilidad';
import { Pensionado } from '../models/pensionado';
import { Exclusion } from '../models/exclusion';


@Component({
  selector: 'app-exclusion',
  templateUrl: './exclusion.component.html',
  styleUrls: ['./exclusion.component.css']
})
export class ExclusionComponent implements OnInit {

  // FORMGROUP
 
  form: FormGroup;
  ordersData: Pensionado[];
  get ordersFormArray() {
    return this.form.controls.orders as FormArray;
  }
  // FORMGROUP

  // FILTROS
  selegibilidad = 0;
  sentidad = 0;
  scapredena = 0;
  sdipreca = 0;
  sips = 0
  // FILTROS this.myForm.value.branch_name = this.branch_detail.branch_name;

  j: number;
  textoexcl: string;
  public elegibilidad: Elegibilidad;
  private exclusion: Exclusion = new Exclusion();

  constructor(private apiExclusionService: ApiExclusionService, private router: Router,
    private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(0))
    });
  }
  public addCheckboxes() {
    this.ordersData.forEach(() => this.ordersFormArray.push(new FormControl(false)));
  }

  ngOnInit(): void {
    this.ObtenerfiltroElegibilidad();
  }

  public ObtenerfiltroElegibilidad(): void {
    console.log('entra a obtener filtros')
    this.form = this.formBuilder.group({
      orders: new FormArray([], this.minSelectedCheckboxes(0))
    });
    this.apiExclusionService.getFiltroElegibilidad
      (this.selegibilidad, this.sentidad, this.scapredena, this.sdipreca, this.sips)
      .subscribe(
        (orders) => {
          this.ordersData = orders.datos
          this.addCheckboxes();
          console.log(this.ordersData)
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
    this.ObtenerfiltroElegibilidad()
  }

  exclution() {
    console.log('excluye');
    this.submit();
  }

  submit() {
    console.log('texto exclusion : ', this.textoexcl)
    const selectedOrderIds = this.form.value.orders
      .map((checked, i) => checked ? this.ordersData[i].iRUN : null)
      .filter(v => v !== null);

    // console.log(selectedOrderIds, this.ordersData[1].iRUN) ;
    var k: number;
    var excluidos : boolean = false;
    var contador = 0;
    for (k = 0; k < this.ordersData.length; k++) {
      if (this.form.value.orders[k]) {
        excluidos = true;
        contador++;
        this.exclusion.iRUN = this.ordersData[k].iRUN;
        this.exclusion.cDV = this.ordersData[k].cDV;
        this.exclusion.vcCodigoUsuarioCreacion = 'jhbravo';
        this.exclusion.vcMensajeExclusion = this.textoexcl;
        this.InsertaExclusion();
        console.log('Graba ', this.form.value.orders[k], 'rut: ', this.ordersData[k].iRUN, this.ordersData[k].cDV)
      }
    }
  //  
  //  Swal.fire('Exclusión Beneficios', 'Operación Realizada' , 'success')
  this.router.navigate(['/inclusion'])
  Swal.fire('Exclusion Beneficiarios', `Se han Excluido ${contador} potenciales beneficiarios con el Siguiente Texto : " ${this.textoexcl} "!`, 'success')
  }

  juega() {
    console.log('aca juega')
  }

  minSelectedCheckboxes(min = 0) {
    const validator: ValidatorFn = (formArray: FormArray) => {
      const totalSelected = formArray.controls
        // get a list of checkbox values (boolean)
        .map(control => control.value)
        // total up the number of checked checkboxes
        .reduce((prev, next) => next ? prev + next : prev, 0);
  
      // if the total is not greater than the minimum, return the error message
      return totalSelected >= min ? null : { required: true };
    };
  
    return validator;
  }
}