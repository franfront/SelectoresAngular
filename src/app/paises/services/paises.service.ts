import { PaisSmall, Pais } from './../interfaces/paises.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private _regiones: string[] = ["Africa", "Americas", "Asia", "Europe", "Oceania"]

  private _baseUrl: string = 'https://restcountries.com/v3.1'

  get regiones(): string[] {
    return [...this._regiones];
  }

  constructor(private http: HttpClient) { }

  getPaisesPorRegion(region: string): Observable<PaisSmall[]> {
    const url: string = `${this._baseUrl}/region/${region}?fields=name,cca3`;
    return this.http.get<PaisSmall[]>(url);
  }

  getPaisPorCodigo(codigo: string): Observable<Pais[] | null> {
    if(!codigo){
      return of(null);
    }
    const url: string = `${this._baseUrl}/alpha/${codigo}`;
    return this.http.get<Pais[]>(url);

  }

  getPaisPorCodigoSmall(codigo: string): Observable<PaisSmall> {
  
    const url: string = `${this._baseUrl}/alpha/${codigo}fields=cca3,name`;
    return this.http.get<PaisSmall>(url);

  }


}
