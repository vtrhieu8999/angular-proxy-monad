import {ChangeDetectorRef, Component} from '@angular/core';
import {StateManager} from "./state-manager.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'User and User\'s group Management' ;
  constructor(private ref: ChangeDetectorRef,
              private stateManager: StateManager) {
    this.stateManager.appChangeDetectorRef = ref;
  }
}
