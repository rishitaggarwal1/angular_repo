import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { ItemDetail } from 'src/Models/item-detail';
import { ApiResponse } from 'src/Models/login-response';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { NetWorthResponse } from 'src/Models/net-worth-response';
import { PortfolioDetail } from 'src/Models/portfolio-detail';
import { StockDetail } from 'src/Models/stock-detail';
import { CALNET_SERVICE_URL } from 'src/utils/api-urls';
import { PORTFOLIO_DETAIL } from 'src/utils/static-data';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {

  _portfolioDetail: PortfolioDetail | null = null;
  _netWorth: NetWorthResponse = {
    totalAssetWorth: 100,
    totalMutualFundWorth: 40,
    totalStockWorth: 60
  }
  isPortfolioUpdated: boolean = false;
  netWorthUrl = CALNET_SERVICE_URL + '/api/Portfolio/calculateNetWorth/';
  portfolioDetailsUrl = CALNET_SERVICE_URL + '/api/Portfolio/portfolioDetails';

  constructor(
    private userService: UserService,
    private http: HttpClient
    ) 
  {
  }

  sell(saleDetail: PortfolioDetail){
    let res: AssetSaleResponse = {
      saleStatus: true,
      networth: 90
    }
    return res;
  }

  get netWorth(){
    return this._netWorth;
  }

  get portfolioDetail() {
    if (!this.userService.isLoggedIn)
      return null;

    return this._portfolioDetail;
  }

  async updatePortfolioDetail() {
    // let portfolioDetail = PORTFOLIO_DETAIL;
    console.log('# Fetching Portfolio Details', this.portfolioDetailsUrl);
    
    let portfolioDetail = await this.http.get<PortfolioDetail>(this.portfolioDetailsUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(`Error: ${error?.statusText} : ${error?.error?.message}`);
          return throwError(error);
        })
      )  
      .toPromise()

    console.log('# PortfolioDetails Response', portfolioDetail);
    this._portfolioDetail = portfolioDetail;
    this.updateNetWorth();
    this.isPortfolioUpdated = true;
  }

  async updateNetWorth(){
    if(!this._portfolioDetail){
      console.log('these code should never be excecuted');
      return;
    }

    let url = this.netWorthUrl + this._portfolioDetail.portfolioId;
    console.info('# Fetching Net Worth', url);
    let net = await this.http.get<number>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(`Error: ${error?.statusText} : ${error?.error?.message}`);
          return throwError(error);
        })
      )
      .toPromise();

    console.log('# NetWorth Response', net);
    
    this._netWorth = {
      totalAssetWorth: net,
      totalMutualFundWorth: 140,
      totalStockWorth: 60
    }
  }
  
  buy(itemDetail: ItemDetail) {
    // Actual me aisa krna pdega
    // this._updatePortfolioDetail();

    // let portfolioDetail: PortfolioDetail | null = this.portfolioDetail;
    // portfolioDetail?.stockList.push(stockDetail);
    console.log('Stock Added to portfolio');
  }
  
}
