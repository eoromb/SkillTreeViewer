import { SkillsComponent } from './skills.component';
import { SkillsService } from '../../services/skills.service';
import { ActivatedRoute, Router } from '@angular/router';

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
