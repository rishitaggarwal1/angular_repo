import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorModel } from 'src/Models/error-model';
import { Item } from 'src/Models/item';
import { ItemDetail } from 'src/Models/item-detail';
import { Stock } from 'src/Models/stock';
import { MutualFundService } from '../mutual-fund.service';
import { PortfolioService } from '../portfolio.service';
import { StockService } from '../stock.service';

const DEFAULT_ITEM_DETAIL: ItemDetail = {
  name: '',
  quantity: 0,
  type: 'stock'
};

@Component({
  selector: 'app-buy-assests',
  templateUrl: './buy-assests.component.html',
  styleUrls: ['./buy-assests.component.css']
})
export class BuyAssestsComponent implements OnInit {
  
  _itemList: Item[] | null = null;
  itemStr: string = 'stock'; 
  itemDetail: ItemDetail = {...DEFAULT_ITEM_DETAIL};
  itemPrice: number = 0;
  errors: ErrorModel[] = [];
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private portfolioService: PortfolioService,
    private stockService: StockService,
    private mutualFundService: MutualFundService
    ) 
    { 
      this.route.paramMap.subscribe(params => { 
        let itemId = Number(params.get('id'));
        this.message = '';      
        this.itemStr = params.get('item') || this.itemStr; 
        this.itemDetail = { ...DEFAULT_ITEM_DETAIL,  type: this.itemStr};
        this._setItemList();

        let item = this.getItemById(itemId);
        if (!item)
          return;

        let itemDetail = {
          name: item.name,
          quantity: 1,
          type: this.itemStr
        };
        this.itemDetail = itemDetail || this.itemDetail;
      });
    }

  ngOnInit(): void { }

  get itemList(){
    return this._itemList || [];
  }

  async _setItemList(){
    let res = await this.itemService.fetch();
    if(res.success){
      this._itemList = res.content;
    }
    else{
      this.errors.push(new ErrorModel(res.message));
    }
  }

  get bill(){
    return this.itemPrice * this.itemDetail.quantity;
  }
  
  get itemService(){
    return this.itemStr === 'stock' ? this.stockService : this.mutualFundService;  
  }

  getItemById(id: number){
    return this._itemList?.find(item => item.id === id);
  }


  handleChange(event: any){
    let option = event.target.selectedOptions[0];
    let price = option.getAttribute('price');
    this.itemPrice = price;
  }

  async onSubmit(){
    console.log(this.itemDetail);
    let res = await this.portfolioService.buy(this.itemDetail);
    if(res.success){
      this.message = res.message  || 'Transaction complete';
    }
    else{
      this.errors.push(new ErrorModel(res.message));
    }
  }
  
}
