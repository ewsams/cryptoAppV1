import { Component, OnInit } from '@angular/core';
import { WEARABLESQUERY } from '../GraphQueries/DecentralQueries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-wearables',
  templateUrl: './wearables.component.html',
  styleUrls: ['./wearables.component.scss'],
})
export class WearablesComponent implements OnInit {
  wearableCompontObject: any = {};
  loading = true;
  page = 1;
  pageSize = 10;
  totalPageElements: number;

  constructor(
    private apollo: Apollo,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.apollo
      .use('DecentralLand')
      .watchQuery({
        query: WEARABLESQUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.wearableCompontObject.wearables = result.data.wearables;
        console.log(result);
        this.totalPageElements = this.wearableCompontObject.wearables.length;
        this.loading = false;
      });
  }
  onSelect(data) {
    this.router.navigate(['wearable-selected', data.id]);
    this.userService.getUserWearableSelection(data);
  }
}
