import { Injectable } from '@angular/core';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { PortfolioDetail } from 'src/Models/portfolio-detail';
import { StockDetail } from 'src/Models/stock-detail';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioServiceService {

  userService: UserService;

  _portfolioDetail: PortfolioDetail | null = null;
  isPortfolioUpdated: boolean = false;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  get portfolioDetail() {
    if (this.userService.isLoggedIn && !this.isPortfolioUpdated)
      this._updatePortfolioDetail();
    return this._portfolioDetail;
  }


  _updatePortfolioDetail() {
    let portfolioDetail = {
      portfolioId: 1,
      stockList: [
        {
          stockName: "TCS",
          stockQuantity: 10
        },
        {
          stockName: "Infosys",
          stockQuantity: 2
        }
      ],
      mutualFundList: [
        {
          mutualFundName: "ICICI Prudential Technology Fund",
          mutualFundQuantity: 10
        },
        {
          mutualFundName: "Axis Small Cap Fund",
          mutualFundQuantity: 5
        }
      ]
    }

    this._portfolioDetail = portfolioDetail;
    this.isPortfolioUpdated = true;
  }

  addStockDetail(stockDetail: StockDetail) {
    // Actual me aisa krna pdega
    // this._updatePortfolioDetail();

    let portfolioDetail: PortfolioDetail | null = this.portfolioDetail;
    portfolioDetail?.stockList.push(stockDetail);
    console.log('Stock Added to portfolio');
  }

  addMutualFundDetail(mutualFundDetail: MutualFundDetail) {
    // Actual me aisa krna pdega
    // this._updatePortfolioDetail();

    let portfolioDetail: PortfolioDetail | null = this.portfolioDetail;
    portfolioDetail?.mutualFundList.push(mutualFundDetail);
    console.log('MutualFund Added to portfolio');
  }

  findUserNetWorth(): NetWorthResponse {
    return {
      totalAssetWorth: 100,
      totalMutualFundWorth: 40,
      totalStockWorth: 60
    };
  }

}
