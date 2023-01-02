import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard/dashboard.component';
import {GroupDetailComponent} from './group-detail/group-detail.component';
import {RouterModule, Routes} from "@angular/router";
import {GroupManagerComponent} from "./group-manager/group-manager.component";

type RouterParam = ''|'/:id'|'/:name';
type PathParam = 'groups'|'dashboard'|'detail';

const routes: Routes = [
  {path: pathBuilder('groups', ''), component: GroupManagerComponent},
  {path: pathBuilder('dashboard', ''), component: DashboardComponent},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: pathBuilder('detail', '/:id'), component: GroupManagerComponent}
];

function pathBuilder(path: PathParam, param: RouterParam): string{
  return `${path}${param}`;
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    /**
     * (adds the RouterModule to this import array) & (configures it with the 'routes')
     * in one step by calling "RouterModule.forRoot(routes)",
     * method is called 'forRoot' because we configure the router at application's root level,
     * forRoot() method:
     * (supplies the service providers and directives needed for routing)
     * & (perform initial navigation based on current browser's URL)
     */
    RouterModule.forRoot(routes)
  ],
  /** export RouterModule to make it available throughout the application */
  exports: [RouterModule]
})
/**
 * RouterOutlet became available to the AppComponent because
 * (AppModule imports(AppRoutingModule exports RouterModule))
 * - 'ng generate' add this import because '--module=app'
 */
export class AppRoutingModule { }
