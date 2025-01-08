import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonTaskService {
  // dropdowns
  genders = [
    {"id": 'male', "name": 'Male'},
    {"id": 'female', "name": 'female'},
    {"id": 'other', "name": 'Other'},
  ]

  specialities = [
    {"id": 'bowler', "name": 'Bowler'},
    {"id": 'batsman', "name": 'Batsman'},
    {"id": 'filder', "name": 'Filder'},
  ]
  constructor() { }
}
