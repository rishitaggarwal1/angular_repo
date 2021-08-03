import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BuyAssestsComponent } from "./buy-assests/buy-assests.component";
import { SellAssestsComponent } from "./sell-assests/sell-assests.component";
import { DashboardComponent } from "./dashboard/dashboard.component";

const routes: Routes = [
    { path: 'buy_assests', component: BuyAssestsComponent },
    { path: 'sell_assests', component: SellAssestsComponent },
    { path: 'dashboard', component: DashboardComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

