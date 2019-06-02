import { Injectable } from '@angular/core';
import { SkillTreeDesc } from 'src/app/core/skill-tree/skill-tree-desc';
import { SkillDesc } from 'src/app/core/skill-tree/skill-desc';
import { SkillDependenciesDesc } from 'src/app/core/skill-tree/skill-dependencies-desc';
import { SkillTree } from 'src/app/core/skill-tree/skill-tree';
import { createSkillViewModel } from '../view-models/skill.view-model';

/**
 * SKills service
 */
@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skillsTree: SkillTree;
  /**
   * Creates Demo skill tree
   */
  static createTestTree() {
    const skills: SkillDesc[] = [
      { name: 'Mage', id: 1 },
      { name: 'Fireball', id: 2 },
      { name: 'Electroshock', id: 3 },
      { name: 'Thunderbolt', id: 4 },
      { name: 'Freeze', id: 5 },
      { name: 'Snowstorm', id: 6 },
      { name: 'Warrior', id: 7 },
      { name: 'Strike', id: 8 },
      { name: 'Double Strike', id: 9 },
      { name: 'Slash', id: 10 },
      { name: 'Hit', id: 11 },
      { name: 'Knockout', id: 12 },
      { name: 'Roundhouse Kick', id: 13 }
    ];
    const skillsDependencies: SkillDependenciesDesc[] = [
      { id: 2, dependOnIds: [1] },
      { id: 3, dependOnIds: [2] },
      { id: 4, dependOnIds: [3] },
      { id: 5, dependOnIds: [2] },
      { id: 6, dependOnIds: [5] },
      { id: 8, dependOnIds: [7] },
      { id: 9, dependOnIds: [8] },
      { id: 10, dependOnIds: [8] },
      { id: 11, dependOnIds: [7] },
      { id: 12, dependOnIds: [11] },
      { id: 13, dependOnIds: [12, 10] },
    ];
    const treeDesc: SkillTreeDesc = {
      skills,
      skillsDependencies
    };
    const skillTree = new SkillTree();
    skillTree.load(treeDesc);
    return skillTree;
  }
  constructor() {
    this.skillsTree = SkillsService.createTestTree();
  }
  /**
   * Gets skill by id
   * @param id skill id
   */
  getSkillById(id) {
    const skill = this.skillsTree.getSkillById(id);
    if (skill == null) {
      return null;
    }
    const dependOns = this.skillsTree.getSkillDependOns(skill.id);
    const dependants = this.skillsTree.getSkillDependants(skill.id);

    return createSkillViewModel(skill, dependOns, dependants);
  }
  /**
   * Gets skill tree
   */
  getSkillTree() {
    return this.skillsTree;
  }
  /**
   * Unlock skill
   */
  unlockSkill(id) {
    this.skillsTree.unlockSkill(id);
    return this.getSkillById(id);
  }
}
