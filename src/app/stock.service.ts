import { Injectable } from '@angular/core';
import { AssetSaleResponse } from 'src/Models/asset-sale-response';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { Stock } from 'src/Models/stock';
import { StockDetail } from 'src/Models/stock-detail';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stocks: Stock[];

  constructor() {
    this.stocks = this.getAllStocks();
  }

  buyStock(stockDetail: StockDetail){
    
  }


  getAllStocks(): Stock[] {
    return [
      {
        stockId: 1,
        stockName: "TCS",
        stockValue: 3219
      },
      {
        stockId: 2,
        stockName: "Infosys",
        stockValue: 1631
      }, {
        stockId: 3,
        stockName: "HDFC Bank",
        stockValue: 1422
      }, {
        stockId: 4,
        stockName: "SBI",
        stockValue: 434
      }, {
        stockId: 5,
        stockName: "ITC",
        stockValue: 207
      },
      {
        stockId: 6,
        stockName: "ONGC",
        stockValue: 117
      }

    ];
  }
}

