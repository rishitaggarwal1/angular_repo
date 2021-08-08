import { MutualFund } from "src/Models/mutual-fund";
import { PortfolioDetail } from "src/Models/portfolio-detail";
import { Stock } from "src/Models/stock";

export let STOCKS: Stock[] = [
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

export let MUTUAL_FUNDS: MutualFund[] = [
    {
      mutualFundId: 1,
      mutualFundName: "ICICI Prudential Technology Fund",
      mutualFundValue: 150
    },
    {
      mutualFundId: 2,
      mutualFundName: "Axis Small Cap Fund",
      mutualFundValue: 61
    },
    {
      mutualFundId: 3,
      mutualFundName: "Tata Digital Fund",
      mutualFundValue: 36
    },
    {
      mutualFundId: 4,
      mutualFundName: "UTI Flexi Cap Fund",
      mutualFundValue: 250
    },
    {
      mutualFundId: 5,
      mutualFundName: "Kotak Small Cap Fund",
      mutualFundValue: 170
    }
]; 

export const PORTFOLIO_DETAIL: PortfolioDetail = {
    portfolioId: 1,
    stockList: [
      {
        stockName: "TCS",
        stockCount: 10
      },
      {
        stockName: "Infosys",
        stockCount: 2
      }
    ],
    mutualFundList: [
      {
        mutualFundName: "ICICI Prudential Technology Fund",
        mutualFundUnits: 10
      },
      {
        mutualFundName: "Axis Small Cap Fund",
        mutualFundUnits: 5
      }
    ]
  }