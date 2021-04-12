import { Component, OnInit } from '@angular/core';
import { LANDQUERY } from '../GraphQueries/DecentralQueries';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-land-available',
  templateUrl: './land-available.component.html',
  styleUrls: ['./land-available.component.scss'],
})
export class LandAvailableComponent implements OnInit {
  landCompontObject: any = {};
  loading = true;
  page = 1;
  pageSize = 9;
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
        query: LANDQUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.landCompontObject.parcels = result.data.parcels;
        this.totalPageElements = this.landCompontObject.parcels.length;
        console.log(result);
        this.loading = false;
      });
  }

  onSelect(data) {
    this.router.navigate(['land-selected', data.nft.createdAt]);
    this.userService.getUserLandSelection(data);
  }
}
