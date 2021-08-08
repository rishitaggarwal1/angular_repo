import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { Item } from 'src/Models/item';
import { ItemDetail } from 'src/Models/item-detail';
import { ApiResponse } from 'src/Models/login-response';
import { MutualFund } from 'src/Models/mutual-fund';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { MUTUAL_FUND_SERVICE } from 'src/utils/api-urls';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  // _mutualFunds: Item[] | null = null;
  mutualFund_url: string = MUTUAL_FUND_SERVICE + '/api/MutualFund/mutualFundNav';

  constructor(private http: HttpClient) {
  }

  async fetch(){
    let res = await this.http.get<MutualFund[]>(this.mutualFund_url)
      .pipe(map<MutualFund[], ApiResponse>(this.mapDataToApiReponse))
      .pipe(catchError(this.mapErrorToApiReponse))
      .toPromise();

    return res;
  }

  mapDataToApiReponse(data: MutualFund[]): ApiResponse {
    let items: Item[] = data.map(value => {
      return {
        id: value.mutualFundId,
        name: value.mutualFundName,
        value: value.mutualFundValue
      }
    });
    
    return {
      success: true,
      message: "Fetched mutual fund successfully",
      content: items
    };

  }

  mapErrorToApiReponse(error: any) {
    let res: ApiResponse = {
      success: false,
      message: error.error.message || error.statusText,
      content: null
    };
    return of(res);
  }
  
}
