import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ApiExclusionService } from '../servicios/api-exclusion.service'

import { Inclusion} from '../models/inclusion';
import { Excluido } from '../models/excluido';

@Component({
  selector: 'app-inclusion',
  templateUrl: './inclusion.component.html',
  styleUrls: ['./inclusion.component.css']
})
export class InclusionComponent implements OnInit {

  public inclusion: Inclusion;
  public datafila: Excluido[];

  constructor(private apiExclusionService: ApiExclusionService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.obtenerExclusion();
  }


  public obtenerExclusion(): void {
    let cperiodo = '202006'
    this.apiExclusionService.getExclusion(cperiodo).subscribe(
      (inclusion) => {
        this.datafila = inclusion.datos
        console.log(this.datafila)
      },
      err => {
        console.log('error')
      }
    );
  }

}
