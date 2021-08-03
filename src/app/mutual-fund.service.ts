import { Injectable } from '@angular/core';
import { MutualFund } from 'src/models/mutualFund';

@Injectable({
  providedIn: 'root'
})
export class MutualFundService {

  constructor() { }
  mutualFunds:MutualFund[]=
  [
    {
     mutualFundId:1,
      mutualFundName:"ICICI Prudential Technology Fund",
      mutualFundValue:150
    },
    {
     mutualFundId:2,
      mutualFundName:"Axis Small Cap Fund",
      mutualFundValue:61
    },
    {
     mutualFundId:3,
      mutualFundName:"Tata Digital Fund",
      mutualFundValue:36
    },
    {
     mutualFundId:4,
      mutualFundName:"UTI Flexi Cap Fund",
      mutualFundValue:250
    },
    {
     mutualFundId:5,
      mutualFundName:"Kotak Small Cap Fund",
      mutualFundValue:170
    }
  ];
  getAllMFFund():MutualFund[]
  {
    return this.mutualFunds;
  }
}
