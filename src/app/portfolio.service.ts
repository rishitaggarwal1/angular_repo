import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
    totalAssetWorth: 0,
    totalMutualFundWorth: 40,
    totalStockWorth: 60
  }
  isPortfolioUpdated: boolean = false;
  
  netWorthUrl = CALNET_SERVICE_URL + '/api/Portfolio/calculateNetWorth/';
  portfolioDetailsUrl = CALNET_SERVICE_URL + '/api/Portfolio/portfolioDetails';
  buyStockUrl = CALNET_SERVICE_URL + '/api/Portfolio/addStock';
  buyMutualFundUrl = CALNET_SERVICE_URL + '/api/Portfolio/addMutualFund';
  sellAssetsUrl = CALNET_SERVICE_URL + '/api/Portfolio/sellAssets/';
  
  constructor(
    private userService: UserService,
    private http: HttpClient
    ) 
  { }

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

    let portfolioDetail = await this.http.get<PortfolioDetail>(this.portfolioDetailsUrl)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(`Error: ${error?.statusText} : ${error?.error?.message}`);
          return throwError(error);
        })
      )  
      .toPromise();

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
    let net = await this.http.get<any>(url)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          alert(`Error: ${error?.statusText} ${error?.error?.message}`);
          return throwError(error);
        })
      )
      .toPromise();
    
    this._netWorth = {
      totalAssetWorth: net.price,
      totalMutualFundWorth: 140,
      totalStockWorth: 60
    }
  }

  async sell(saleDetail: PortfolioDetail){
    let res = await this.http.post<AssetSaleResponse>(this.sellAssetsUrl + this.portfolioDetail?.portfolioId, saleDetail)
      .pipe(
        map<AssetSaleResponse, ApiResponse>(this.mapDataToApiReponse),
        catchError(this.mapErrorToApiReponse)
      )
      .toPromise();
    this.updatePortfolioDetail() 
    return res;
  }

  async buy(itemDetail: ItemDetail) {
    // Actual me aisa krna pdega
    // this._updatePortfolioDetail();
    let res;
    if(itemDetail.type === 'stock'){
      let data = {
        stockName: itemDetail.name,
        stockCount: itemDetail.quantity
      }
      res = await this.http.post<any>(this.buyStockUrl, data)
        .pipe(
          map<any, ApiResponse>(this.mapDataToApiReponse),
          catchError(this.mapErrorToApiReponse)
        )
        .toPromise();
    }
    else{
      let data = {
        mutualFundName: itemDetail.name,
        mutualFundUnits: itemDetail.quantity
      }
      res = await this.http.post(this.buyMutualFundUrl, data)
        .pipe(
          map<any, ApiResponse>(this.mapDataToApiReponse),
          catchError(this.mapErrorToApiReponse)
        )
        .toPromise();
    }

    return res;
  }

  mapDataToApiReponse(data: any){
    // Updating the service state  
    // console.log(data);
    return {
      success: true,
      message: data?.message || 'Transaction complete',
      content: data
    };

  }

  mapErrorToApiReponse(error: any){
    console.log(error, error.error);
    let res: ApiResponse = {
      success: false,
      message: error?.error?.message || error.statusText,
      content: null
    };
    return of(res);
  }
}


