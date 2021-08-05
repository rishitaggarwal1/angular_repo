import { Injectable } from '@angular/core';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { MutualFund } from 'src/Models/mutual-fund';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { StockDetail } from 'src/Models/stock-detail';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  mutualFunds: MutualFund[];

  constructor() {
    this.mutualFunds = this.getAllMutualFunds();
  }

  buyMutualFund(mutualFundDetail: MutualFundDetail){

  }

  getAllMutualFunds(): MutualFund[] {
    return [
      {
        mutualFundId: 1,
        mutualFundName: "ICICI Prudential Technology Fund",
        mutualFundValue: 150
      },
      {
        mutualFundId: 2,
        mutualFundName: "Axis Small Cap Fund",
        mutualFundValue: 61
      },
      {
        mutualFundId: 3,
        mutualFundName: "Tata Digital Fund",
        mutualFundValue: 36
      },
      {
        mutualFundId: 4,
        mutualFundName: "UTI Flexi Cap Fund",
        mutualFundValue: 250
      },
      {
        mutualFundId: 5,
        mutualFundName: "Kotak Small Cap Fund",
        mutualFundValue: 170
      }
    ];
  }
}
