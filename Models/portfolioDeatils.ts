import { MutualFundDetail } from "./mutualFundDetails";
import { StockDetail } from "./stockDetails";

export interface PortfolioDetail
{
    //Defining required properties.
    portfolioId: number;
    stockList: StockDetail[];
    mutualFundList: MutualFundDetail[];
}
