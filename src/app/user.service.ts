import { NullTemplateVisitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Customer } from 'src/models/customer';
import { LoginModel } from 'src/models/loginmodel';
import { PortfolioDetail } from 'src/models/portfolioDeatils';
import { StockDetail } from 'src/models/stockDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: Customer={
    username:"",
    portfolioDetail:{
      portfolioId:0,
      stockList:[],
      mutualFundList:[]
      

    }
  }

  constructor() { 
  }

  setPortfolioDetail(portfolioId:number)
  {
    let portfolioDetail= {
        portfolioId:1,
        stockList:[
          {
           stockName:"TCS",
           stockQuantity:10
         },
         {
           stockName:"Infosys",
           stockQuantity:2
         }
        ],
        mutualFundList:[
          {
             mutualFundName:"ICICI Prudential Technology Fund",
             mutualFundQuantity:10
           },
           {
             mutualFundName:"Axis Small Cap Fund",
             mutualFundQuantity:5
           }

        ]
    }  
    this.user={
      ...this.user,
      portfolioDetail:portfolioDetail,

    } 
  }
  login(logins:LoginModel){
    this.setPortfolioDetail(1);
  }
  updateUserDetails(user:Customer) {
    this.user=user;
  }
  addStock(detail:StockDetail) {

    console.log("Added Successfully");
    this.setPortfolioDetail(this.user?.portfolioDetail.portfolioId || 1);
    

  }
}
