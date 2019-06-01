import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisualizationRoutingModule } from './visualization-routing.module';
import { SkillDetailsComponent } from './components/skill-details/skill-details.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SharedModule } from '../shared/shared.module';
import { SkillResolver } from './resolvers/skill.resolver';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { DependenciesListComponent } from './components/dependencies-list/dependencies-list.component';

@NgModule({
  declarations: [SkillDetailsComponent, SkillsComponent, DependenciesListComponent],
  imports: [
    CommonModule,
    VisualizationRoutingModule,
    SharedModule,
    MatIconModule,
    MatTooltipModule
  ],
  providers: [SkillResolver]
})
export class VisualizationModule { }
