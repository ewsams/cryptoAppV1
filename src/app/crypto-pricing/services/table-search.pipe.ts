import { Pipe, PipeTransform } from '@angular/core';
import { PricingTableModel } from '../../crypto-pricing/models/pricing-table-model';

@Pipe({
  name: 'tableSearch'
})
export class TableSearchPipe implements PipeTransform {
  transform(tokens: PricingTableModel[], searchValue: string): PricingTableModel[] {
    if (!tokens || !searchValue) {
      return tokens;
    }
    return tokens.filter((user) =>
      user.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
    );
  }

}
