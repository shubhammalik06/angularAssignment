import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Person } from './person.model';
import { Observable, BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class FormService {

  private _jsonURL = 'assets/country.json';

  selectedPerson: Person;
  person: Person[];

  constructor(private http: HttpClient) { }

  // API's

  // Country list from JSON
  public getJSON(): Observable<any> {
    return this.http.get(this._jsonURL);
  }

  // Country list from API
  // fetchCountires() {
  //   return this.http.get(environment.countriesData); // CORS error in online JSON's
  // }

  // Person List
  personList() {
    return this.http.get(environment.baseUrl);
  }

  // add person
  addPerson(person: Person) {
    return this.http.post(environment.baseUrl, person);
  }

  // edit person
  putEmployee(person: Person, id) {
    return this.http.patch(environment.baseUrl + `/${id}`, person);
  }

}