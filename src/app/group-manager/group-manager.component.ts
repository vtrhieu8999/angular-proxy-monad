import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Group} from '../model';
import {MessageService} from '../service/message.service';
import {Proxy, Src} from "../functional-util/Proxy";
import {Observable} from "rxjs";
import {CachedMapFunction} from "../functional-util/CachedMapFunction";
import {GroupService} from "../service/group.service";

@Component({
  selector: 'app-group-manager',
  templateUrl: './group-manager.component.html',
  styleUrls: ['./group-manager.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupManagerComponent implements OnInit {
  groups: CachedMapFunction<Group, Src<Group>>;
  constructor(private messageService: MessageService,
              private groupService: GroupService) {
    this.groups = groupService.groupData;
  }

  ngOnInit(): void {
  }

}
