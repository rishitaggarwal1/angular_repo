import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { BuyAssestsComponent } from "./buy-assests/buy-assests.component";
import { SellAssestsComponent } from "./sell-assests/sell-assests.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { AuthGuard } from "./auth.guard";

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    {
        path: '',
        children: [
            { path: 'dashboard', component: DashboardComponent },
            { path: 'buy', component: BuyAssestsComponent },
            { path: 'buy/:item', component: BuyAssestsComponent },
            { path: 'buy/:item/:id', component: BuyAssestsComponent},
            { path: 'sell', component: SellAssestsComponent },
            { path: 'sell/:item', component: SellAssestsComponent },
            { path: '', component: DashboardComponent }
        ],
        canActivate: [AuthGuard]
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }

