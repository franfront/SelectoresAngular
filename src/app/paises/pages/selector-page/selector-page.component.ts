import { PaisSmall } from './../../interfaces/paises.interface';
import { PaisesService } from './../../services/paises.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [],
})
export class SelectorPageComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: ['', Validators.required],
  });

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: string[] = [];


  cargando: boolean = false;

  constructor(private fb: FormBuilder, private paisesService: PaisesService) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // this.miForm.get('region')?.valueChanges.subscribe((region) => {
    //   console.log(region);

    //   this.paisesService.getPaisesPorRegion(region).subscribe((paises) => {
    //     console.log(paises)
    //     this.paises = paises;
    //   });
    // });

    this.miForm
      .get('region')
      ?.valueChanges.pipe(
        tap((_) => {
          this.miForm.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap((region) => this.paisesService.getPaisesPorRegion(region))
      )
      .subscribe((valor) => {
        this.paises = valor;
        this.cargando = false;
      });

    this.miForm
      .get('pais')
      ?.valueChanges.pipe(
        tap((_) => { 
          this.miForm.get('frontera')?.reset('');
          this.cargando = true;
  
        }),
        switchMap((codigo) => this.paisesService.getPaisPorCodigo(codigo))
      )
      .subscribe((pais) => {
        this.fronteras = pais ? pais[0]?.borders : [];
        this.cargando = false;
      });
  }

  guardar() {
    console.log(this.miForm.value);
  }
}
