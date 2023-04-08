import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormService {

countries:[]=[]
  states: any;



  constructor(private http:HttpClient) {

    // this.getCountries();
    // this.getStats('IN');
  }

  getCountries() {

    try {
      return this.http.get<any>("https://restcountries.com/v3.1/all?fields=name,cca2")

    } catch (error:any) {
      return throwError(()=>new Error(error))

    }

  }


  getStats(countryCode: string) {
    const url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log(res);

        // Extract the subdivisions array from the response
        const subdivisions = res[0].subdivisions;

        // Extract the names of the subdivisions into an array
        this.states = Object.values(subdivisions).map((subdivision: any) => subdivision.name);

        console.log(this.states);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
