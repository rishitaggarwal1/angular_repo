import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { Item } from 'src/Models/item';
import { ItemDetail } from 'src/Models/item-detail';
import { ApiResponse } from 'src/Models/login-response';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { Stock } from 'src/Models/stock';
import { StockDetail } from 'src/Models/stock-detail';
import { STOCK_SERVICE_URL } from 'src/utils/api-urls';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  // _stocks: Item[] | null = null;
  stock_url: string = STOCK_SERVICE_URL + "/api/stock/dailySharePrice";

  constructor(private http: HttpClient) {
    
  }

  async fetch(){
    let res = await this.http.get<Stock[]>(this.stock_url)
      .pipe(map<Stock[], ApiResponse>(this.mapDataToApiReponse))
      .pipe(catchError(this.mapErrorToApiReponse))
      .toPromise();
        
    return res;
  }

  mapDataToApiReponse(data: Stock[]): ApiResponse {
    let items = data.map(value => {
      return {
        id: value.stockId,
        name: value.stockName,
        value: value.stockValue
      }
    });
    
    return {
      success: true,
      message: "Fetched stocks successfully",
      content: items
    };

  }

  mapErrorToApiReponse(error: any) {
    console.log(error);
    let res: ApiResponse = {
      success: false,
      message: error.error?.message || error.statusText,
      content: null
    };
    return of(res);
  }
}
