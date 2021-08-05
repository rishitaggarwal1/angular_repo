import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/Models/item';
import { ItemDetail } from 'src/Models/item-detail';
import { Stock } from 'src/Models/stock';
import { MutualFundService } from '../mutual-fund.service';
import { StockService } from '../stock.service';

const DEFAULT_ITEM_DETAIL: ItemDetail = {
  name: '',
  quantity: 0
};

@Component({
  selector: 'app-buy-assests',
  templateUrl: './buy-assests.component.html',
  styleUrls: ['./buy-assests.component.css']
})
export class BuyAssestsComponent implements OnInit {
  
  itemStr: string = 'stock'; 
  itemId: number | null = -1;
  itemPrice: number = 0;
  itemDetail: ItemDetail = {...DEFAULT_ITEM_DETAIL};


  constructor(
    private route: ActivatedRoute,
    private stockService: StockService,
    private mutualFundService: MutualFundService
    ) 
    { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.itemStr = params.get('item') || this.itemStr; 
      this.itemId = Number(params.get('id'));
      this.itemDetail = { ...DEFAULT_ITEM_DETAIL };
      if(this.itemStr === 'stock'){
        let stock = this.stockService.getStockById(this.itemId);
        if (!stock)
          return;
        this.itemPrice = stock.stockValue;
        let itemDetail = {
          name: stock?.stockName,
          quantity: 1
        };
        this.itemDetail = itemDetail || this.itemDetail;
      }
      else{
        let mutualFund = this.mutualFundService.getMutualFundById(this.itemId);
        if (!mutualFund)
          return;
        
        this.itemPrice = mutualFund.mutualFundValue;
        let itemDetail = {
          name: mutualFund?.mutualFundName,
          quantity: 1
        };
        this.itemDetail = itemDetail || this.itemDetail;
      }
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

  get bill(){
    return this.itemPrice * this.itemDetail.quantity;
  }

  handleChange(event: any){
    let option = event.target.selectedOptions[0];
    let price = option.getAttribute('price');
    this.itemPrice = price;
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
