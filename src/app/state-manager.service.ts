import {ChangeDetectorRef, Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateManager {
  get appChangeDetectorRef(): ChangeDetectorRef {
    return this._appChangeDetectorRef;
  }

  set appChangeDetectorRef(value: ChangeDetectorRef) {
    this._appChangeDetectorRef = value;
  }

  private _appChangeDetectorRef!: ChangeDetectorRef;

  constructor() { }

}
