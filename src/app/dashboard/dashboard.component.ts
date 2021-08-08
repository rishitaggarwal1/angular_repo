import { Component, OnInit } from '@angular/core';
import { PortfolioDetail } from 'src/Models/portfolio-detail';
import { PortfolioService } from '../portfolio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  portfolioService: PortfolioService;

  constructor(portfolioService: PortfolioService) {
    this.portfolioService = portfolioService;
  }

  ngOnInit(): void {
  }

  get portfolioDetail(){
    return this.portfolioService.portfolioDetail;
  }

  get stockList(){
    return this.portfolioDetail?.stockList || [];
  }

  get mutualFundList(){
    return this.portfolioDetail?.mutualFundList || [];
  }

  get netWorth(){
    return this.portfolioService.netWorth;
  }

}
