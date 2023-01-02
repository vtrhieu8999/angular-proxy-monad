import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GroupManagerComponent } from './group-manager/group-manager.component';
import { UserManagerComponent } from './user-manager/user-manager.component';
import { MessageComponent } from './message/message.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GroupDetailComponent } from './group-detail/group-detail.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {HttpClientModule} from "@angular/common/http";
import {HttpClientInMemoryWebApiModule} from "angular-in-memory-web-api";
import {InMemoryDataService} from "./service/in-memory-data.service";
import {Proxy} from "./functional-util/Proxy";

@NgModule({
  declarations: [
    AppComponent,
    GroupManagerComponent,
    UserManagerComponent,
    MessageComponent,
    DashboardComponent,
    GroupDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
