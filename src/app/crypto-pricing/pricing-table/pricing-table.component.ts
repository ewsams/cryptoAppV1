import { Component, OnInit } from '@angular/core';
import { TABLEPRICINGQUERY } from '../../crypto-pricing/GraphQueries/UniswapQueries';
import { PricingTableModel } from '../../crypto-pricing/models/pricing-table-model';
import { Apollo } from 'apollo-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pricing-table',
  templateUrl: './pricing-table.component.html',
  styleUrls: ['./pricing-table.component.scss'],
})
export class PricingTableComponent implements OnInit {
  searchValue: string;
  pricingTable: PricingTableModel[] = [];
  loading = true;
  constructor(private apollo: Apollo, private router: Router) {}

  ngOnInit() {
    this.apollo
      .use('Uniswap')
      .watchQuery({
        query: TABLEPRICINGQUERY,
      })
      .valueChanges.subscribe((result: any) => {
        this.pricingTable = result.data.tokens.filter(
          (element) => element.tradeVolumeUSD > 0 && element.totalLiquidity > 0
        );
        this.loading = false;
      });
  }
}
