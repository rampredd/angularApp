import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GrowthAnalysisComponent } from './growth-analysis/growth-analysis.component';
import { AnalyzeComponent } from './analyze/analyze.component';
import { CompareComponent } from './compare/compare.component';
import { AboutComponent } from './about/about.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SettingsComponent } from './settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'about', component: AboutComponent, canActivate: [AuthGuardService] },
  { path: 'compare', component: CompareComponent, canActivate: [AuthGuardService] },
  { path: 'analyze', component: AnalyzeComponent, canActivate: [AuthGuardService] },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuardService] },
  { path: 'growth/analysis', component: GrowthAnalysisComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },



];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
