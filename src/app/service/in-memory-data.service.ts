import { Injectable } from '@angular/core';
import {InMemoryDbService} from "angular-in-memory-web-api";
import {Observable} from "rxjs";
import {GROUPS} from "../mock-data";

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{

  constructor() { }

  createDb(): {} | Observable<{}> | Promise<{}> {
    return GROUPS;
  }

}
