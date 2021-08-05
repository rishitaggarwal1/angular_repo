import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/Models/item';
import { ItemDetail } from 'src/Models/item-detail';
import { Stock } from 'src/Models/stock';
import { MutualFundService } from '../mutual-fund.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-buy-assests',
  templateUrl: './buy-assests.component.html',
  styleUrls: ['./buy-assests.component.css']
})
export class BuyAssestsComponent implements OnInit {

  itemStr: string = 'stock'; 

  itemDetail: ItemDetail= {
    name: '',
    quantity: 0 
  };

  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private mutualFundService: MutualFundService
    ) 
    { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.itemStr = params.get('item') || this.itemStr; 
    });
  }

  get itemList(){
    if ( this.itemStr === 'stock'){
      return this.stockService.getAllStocks().map(item => {
        return {
          id: item.stockId,
          name: item.stockName,
          value: item.stockValue
        };
      }) || [];
    }
    else{
      return this.mutualFundService.getAllMutualFunds().map(item => {
        return {
          id: item.mutualFundId,
          name: item.mutualFundName,
          value: item.mutualFundValue
        };
      }) || [];
    }
  }

  onSubmit(){

    if(this.itemStr === 'stock'){
      this.stockService.buyStock({
        stockName: this.itemDetail.name,
        stockQuantity: this.itemDetail.quantity
      })
    }
    else{
      this.mutualFundService.buyMutualFund({ 
        mutualFundName: this.itemDetail.name,
        mutualFundQuantity: this.itemDetail.quantity
      });
    } 
    console.log(this.itemDetail);
    alert(`${this.itemDetail.name} ${this.itemDetail.quantity}`)
  }
  
}
