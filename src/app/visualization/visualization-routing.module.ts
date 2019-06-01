import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SkillsComponent } from './components/skills/skills.component';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { SkillResolver } from './resolvers/skill.resolver';

const routes: Routes = [
  { path: '', component: SkillsComponent},
  { path: ':id', component: SkillDetailsComponent, resolve: { skill: SkillResolver }, runGuardsAndResolvers: 'paramsOrQueryParamsChange' }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisualizationRoutingModule { }
