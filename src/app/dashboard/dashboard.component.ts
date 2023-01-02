import {
  ApplicationRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  NgZone,
  OnInit
} from '@angular/core';
import {Group} from '../model';
import {GroupService} from '../service/group.service';
import {MaybeProxy} from "../functional-util/Maybe";
import {GROUPS} from "../mock-data";
import {CachedMapFunction} from "../functional-util/CachedMapFunction";
import {Src} from "../functional-util/Proxy";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  groups: CachedMapFunction<Group, Src<Group>>;

  constructor(private groupService: GroupService,
              private ref: ChangeDetectorRef) {
    this.groups = groupService.groupData;
    // this.groups.binding([this.ref.markForCheck]);
  }

  setGroup(groups: Group[]): void {
    this.ref.detectChanges();
  }

  ngOnInit(): void {
  }

  onSelect(gr: Group): void {
    gr.group_id++;
  }

}
