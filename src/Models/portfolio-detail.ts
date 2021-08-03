import { MutualFundDetail } from "./mutual-fund-detail";
import { StockDetail } from "./stock-detail";

export interface PortfolioDetail {
    //Defining required properties.
    portfolioId: number;
    stockList: StockDetail[];
    mutualFundList: MutualFundDetail[];
}
