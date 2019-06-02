import { Injectable } from '@angular/core';

import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { SkillsService } from '../services/skills.service';
import { SkillViewModel } from '../view-models/skill.view-model';

/**
 * Resolves skill data for SkillDetailsComponent
 */
@Injectable()
export class SkillResolver implements Resolve<SkillViewModel> {
  constructor(
    private skillService: SkillsService
  ) {
  }

  resolve(route: ActivatedRouteSnapshot) {
    const id = +route.paramMap.get('id');
    return this.skillService.getSkillById(id);
  }
}
