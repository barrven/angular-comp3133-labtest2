import { Component, OnInit, Input } from '@angular/core';
import { LaunchService } from '../network/launch.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Launch } from '../models/launch';

@Component({
  selector: 'app-missiondetails',
  templateUrl: './missiondetails.component.html',
  styleUrls: ['./missiondetails.component.css']
})
export class MissiondetailsComponent implements OnInit {

  launch?: Launch;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private launchService: LaunchService
  ) { }

  ngOnInit(): void {
    this.getLaunch();
  }

  getLaunch(): void {
    const id = +this.route.snapshot.paramMap.get('id'); // '+' converts this to a string
    this.launchService.getLaunch(id)
      .subscribe(res => this.launch = res);
  }

  goBack(): void {
    this.location.back();
  }

}
