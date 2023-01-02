import { Injectable } from '@angular/core';
import {Group} from '../model';
import {GROUPS} from '../mock-data';
import {catchError, Observable, Observer, of, tap} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MaybeProxy, MaybeSrc} from "../functional-util/Maybe";
import {Src} from "../functional-util/Proxy";
import {CachedMapFunction} from "../functional-util/CachedMapFunction";

@Injectable({
  providedIn: 'root'
})
export class GroupService {
  readonly groups: Observable<Group[]>;
  readonly groupData: CachedMapFunction<Group, Src<Group>>;
  private readonly groupUrl: string = 'api/group';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  constructor(private messageService: MessageService,
              private http: HttpClient) {
    this.messageService.add('GroupService: Fetched groups ');
    this.groupData = new CachedMapFunction<Group, Src<Group>>(gr => Src.from(gr), []);
    // this.groups = this.http.get<Group[]>(this.groupUrl);
    this.groups = this.getGroups();
    this.groups.subscribe(groups => groups.forEach(this.groupData.set, this.groupData));
  }

  log(value: any): void{
    // const x: Observer<Group>;
  }

  getGroups(): Observable<Group[]>{
    return of(GROUPS);
  }

  private handleError<T>(operation: string, result?: T): (error: any) => Observable<T> {
    return (error: any) => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  updateGroup(gr: Group): Observable<any>{
    return this.http.put(this.groupUrl, gr, this.httpOptions)
      .pipe(tap(_ => this.log(`updated group id=${gr.group_id}`)),
        catchError(this.handleError<any>('updateGroup'))
      );
  }
}
