import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { SkillDetailsComponent } from './skill-details.component';
import { SkillsService } from '../../services/skills.service';
import { createSkill } from 'src/app/core/skill-tree/skill';
import { SkillsComponent } from '../skills/skills.component';
import { DependenciesListComponent } from '../dependencies-list/dependencies-list.component';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisualizationRoutingModule } from '../../visualization-routing.module';
import { createSkillViewModel } from '../../view-models/skill.view-model';

/**
 * Skill details component tests
 */
describe('SkillDetailsComponent', () => {
  let component: SkillDetailsComponent;
  let fixture: ComponentFixture<SkillDetailsComponent>;
  let skillsService;
  const skill = createSkillViewModel(createSkill({ id: 1, name: 'Test skill' }));
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SkillDetailsComponent, SkillsComponent, DependenciesListComponent],
      imports: [MatIconModule, MatTooltipModule, SharedModule, VisualizationRoutingModule],
      providers: [
        { provide: SkillsService, useValue: jasmine.createSpyObj('SkillsService', ['unlockSkill']) },
        { provide: ActivatedRoute, useValue: {data: of({skill})}}
      ]
    }).compileComponents();
    skillsService = TestBed.get(SkillsService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkillDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should take skill from ActivatedRoute', () => {
    expect(component.skill).toEqual(skill);
  });
  it('should call skill service unlockskill with skill on unlock clicked', () => {
    component.unlock();
    expect(skillsService.unlockSkill).toHaveBeenCalledTimes(1);
    expect(skillsService.unlockSkill).toHaveBeenCalledWith(skill.id);
  });
});
