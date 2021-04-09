import { Component, OnInit } from '@angular/core';
import { Launch } from '../models/launch';
import { LaunchService } from '../network/launch.service';

@Component({
  selector: 'app-missionlist',
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {

  launches: Launch[] = [];

  constructor(private launchService: LaunchService) { }

  ngOnInit(): void {
    this.getLaunches();
  }

  getLaunches(): void {
    this.launchService.getLaunches()
      .subscribe(res => this.launches = res);
  }

}
