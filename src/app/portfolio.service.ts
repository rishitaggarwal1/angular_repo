import { Injectable } from '@angular/core';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { ItemDetail } from 'src/Models/item-detail';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { NetWorthResponse } from 'src/Models/net-worth-response';
import { PortfolioDetail } from 'src/Models/portfolio-detail';
import { StockDetail } from 'src/Models/stock-detail';
import { PORTFOLIO_DETAIL } from 'src/utils/static-data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  _portfolioDetail: PortfolioDetail | null = null;
  _netWorth = {
    totalAssetWorth: 100,
    totalMutualFundWorth: 40,
    totalStockWorth: 60
  }
  isPortfolioUpdated: boolean = false;

  constructor(private userService: UserService) {
  }

  sell(saleDetail: PortfolioDetail){
    let res: AssetSaleResponse = {
      saleStatus: true,
      networth: 90
    }
    return res;
  }

  get portfolioDetail() {
    if (!this.userService.isLoggedIn)
      return null;

    if (!this.isPortfolioUpdated)
      this._updatePortfolioDetail();
      
    return this._portfolioDetail;
  }

  get netWorth(){
    return this._netWorth;
  }
  
  updateNetWorth(){
    this._netWorth = {
      totalAssetWorth: 200,
      totalMutualFundWorth: 140,
      totalStockWorth: 60
    }
  }
  
  _updatePortfolioDetail() {
    let portfolioDetail = PORTFOLIO_DETAIL;

    this._portfolioDetail = portfolioDetail;
    this.isPortfolioUpdated = true;
  }

  buy(itemDetail: ItemDetail) {
    // Actual me aisa krna pdega
    // this._updatePortfolioDetail();

    // let portfolioDetail: PortfolioDetail | null = this.portfolioDetail;
    // portfolioDetail?.stockList.push(stockDetail);
    console.log('Stock Added to portfolio');
  }

}
