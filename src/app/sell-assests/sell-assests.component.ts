import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ErrorModel } from 'src/Models/error-model';
import { ItemDetail } from 'src/Models/item-detail';
import { MutualFundDetail } from 'src/Models/mutual-fund-detail';
import { PortfolioDetail } from 'src/Models/portfolio-detail';
import { StockDetail } from 'src/Models/stock-detail';
import { MutualFundService } from '../mutual-fund.service';
import { PortfolioService } from '../portfolio.service';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-sell-assests',
  templateUrl: './sell-assests.component.html',
  styleUrls: ['./sell-assests.component.css']
})
export class SellAssestsComponent implements OnInit {
  
  itemStr: string = 'stock';
  mxQuantity: number = 0;
  itemDetail: ItemDetail = {
    name: '',
    quantity: 0,
    type: 'stock' 
  };
  message: string = '';
  errors: ErrorModel[] = []
  portfolioService : PortfolioService;
  // portfolioDetail: PortfolioDetail | null;

  constructor(
    private route: ActivatedRoute,
    portfolioService: PortfolioService
    ) {
      this.route.paramMap.subscribe(params => { 
        this.errors = [];
        this.message = ''
        this.itemStr = params.get('item') || this.itemStr; 
        this.itemDetail = {
          name: '',
          quantity: 0,
          type: this.itemStr
        };
      });

      this.portfolioService = portfolioService;
      portfolioService.updatePortfolioDetail();
  }

  ngOnInit(): void { }

  get portfolioDetail(){
    return this.portfolioService.portfolioDetail;
  }
  get itemList(){
    if ( this.itemStr === 'stock'){
      return this.portfolioDetail?.stockList.map(item => {
        return {
          name: item.stockName,
          quantity: item.stockCount
        };
      }) || [];
    }
    else{
      return this.portfolioDetail?.mutualFundList.map(item => {
        return {
          name: item.mutualFundName,
          quantity: item.mutualFundUnits
        };
      }) || [];
    }
  } 

  handleChange(event: any, quantity: NgModel){
    let option = event.target.selectedOptions[0];
    this.mxQuantity = Number(option.getAttribute('quantity'));
    quantity.control.setValue(this.mxQuantity);
  }

  limitQuantity(quantity: NgModel){
    if (this.itemDetail.quantity > this.mxQuantity){
      this.itemDetail.quantity = this.mxQuantity;
    }
    if (this.itemDetail.quantity < 1){
      this.itemDetail.quantity = 1;
    }
    
  }

  async onSubmit(){
    let saleDetail: PortfolioDetail = {
      portfolioId: this.portfolioDetail?.portfolioId || -1,
      stockList: [],
      mutualFundList: []
    };

    let itemDetail: ItemDetail = this.itemDetail;
    if(this.itemStr === 'stock'){
      saleDetail.stockList =[{ 
        stockName: itemDetail.name,
        stockCount: itemDetail.quantity
      }]
    }
    else{
      saleDetail.mutualFundList =[{ 
        mutualFundName: itemDetail.name,
        mutualFundUnits: itemDetail.quantity
      }]
    }
    let res = await this.portfolioService.sell(saleDetail);
    if(res.success){
      this.message = res?.content?.message || res.message;
    }
    else{
      this.errors.push(new ErrorModel(res.message));
    }
    // alert(`${this.itemDetail.name} ${this.itemDetail.quantity} ${this.itemDetail.type}`);
  }


}
