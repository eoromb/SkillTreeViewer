import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule, MatTooltipModule } from '@angular/material';
import { SkillsComponent } from './skills.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { VisualizationRoutingModule } from '../../visualization-routing.module';
import { SkillDetailsComponent } from '../skill-details/skill-details.component';
import { DependenciesListComponent } from '../dependencies-list/dependencies-list.component';
import { SkillsService } from '../../services/skills.service';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';

/**
 * Skills details component tests
 */
describe('SkillsComponent', () => {
    let component: SkillsComponent;
    let router: Router;
    let activatedRoute: ActivatedRoute;
    let skillService;
    beforeEach(() => {
        router = jasmine.createSpyObj('Router', ['navigate']) as Router;
        skillService = new SkillsService();
        activatedRoute = {} as ActivatedRoute;
        component = new SkillsComponent(skillService, router, activatedRoute);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should navigate on node click', () => {
        component.onNodeClicked(1);
        expect(router.navigate).toHaveBeenCalledTimes(1);
    });
});
