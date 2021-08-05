import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgModel, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
    quantity: 0 
  };

  portfolioService : PortfolioService;
  portfolioDetail: PortfolioDetail | null;

  get itemList(){
    if ( this.itemStr === 'stock'){
      return this.portfolioDetail?.stockList.map(item => {
        return {
          name: item.stockName,
          quantity: item.stockQuantity
        };
      }) || [];
    }
    else{
      return this.portfolioDetail?.mutualFundList.map(item => {
        return {
          name: item.mutualFundName,
          quantity: item.mutualFundQuantity
        };
      }) || [];
    }
  }

  constructor(
    private route: ActivatedRoute,
    portfolioService: PortfolioService
    ) {
      this.portfolioService = portfolioService;
      this.portfolioDetail = portfolioService.portfolioDetail;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => { 
      this.itemStr = params.get('item') || this.itemStr; 
    });
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

  onSubmit(){
    let saleDetail: PortfolioDetail = {
      portfolioId: this.portfolioDetail?.portfolioId || -1,
      stockList: [],
      mutualFundList: []
    };

    let itemDetail: ItemDetail = this.itemDetail;
    if(this.itemStr === 'stock'){
      saleDetail.stockList =[{ 
        stockName: itemDetail.name,
        stockQuantity: itemDetail.quantity
      }]
    }
    else{
      saleDetail.mutualFundList =[{ 
        mutualFundName: itemDetail.name,
        mutualFundQuantity: itemDetail.quantity
      }]
    }
    let res = this.portfolioService.sell(saleDetail);
    alert(`${this.itemDetail.name} ${this.itemDetail.quantity}`);
  }


}
