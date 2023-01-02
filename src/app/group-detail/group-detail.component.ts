import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges, OnDestroy,
  OnInit
} from '@angular/core';
import {Group} from '../model';
import {GroupService} from '../service/group.service';
import {ActivatedRoute} from '@angular/router';
import {flatMap, fromEvent, interval, map, tap} from "rxjs";
import {Maybe, MaybeProxy, MaybeSrc} from "../functional-util/Maybe";
import {Src} from "../functional-util/Proxy";

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
  styleUrls: ['./group-detail.component.css']
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailComponent implements OnInit, OnChanges, OnDestroy {
  get group(): Group {
    return this._group.get();
  }

  @Input() set group(value: Group) {
    this._group.set(value);
  }

  @Input() _group!: Src<Group>;

  constructor(private groupService: GroupService,
              private route: ActivatedRoute,
              private ref: ChangeDetectorRef) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this._group.binding([ref.markForCheck.bind(ref)]);
  }

  ngOnChanges(): void {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this._group?.detach();
  }

  onSelect(gr: Group): void {
    gr.group_id++;
  }

  goBack(): void {
  }

  save(group: Group): void {
    this.group = group;
  }

  delete(): void {
    this.groupService.groupData.delete(this.group);
  }

}
