import { Injectable } from '@angular/core';
import { SkillTreeDesc } from 'src/app/core/skill-tree/skill-tree-desc';
import { SkillDesc } from 'src/app/core/skill-tree/skill-desc';
import { SkillDependency } from 'src/app/core/skill-tree/skill-dependencies';
import { SkillTree } from 'src/app/core/skill-tree/skill-tree';
import { createSkillViewModel } from '../view-models/skill.view-model';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {
  skillsTree: SkillTree;
  constructor() {
    this.skillsTree = SkillsService.createTestTree();
  }
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
    const skillsDependencies: SkillDependency[] = [
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
    return SkillTree.createSkillTree(treeDesc);
  }
  getSkillById(id) {
    const skill = this.skillsTree.getSkillById(id);
    if (skill == null) {
      return null;
    }
    const dependOns = this.skillsTree.getSkillDependOns(skill.id);
    const dependants = this.skillsTree.getSkillDependants(skill.id);

    return createSkillViewModel(skill, dependOns, dependants);
  }
  getSkillTree() {
    return this.skillsTree;
  }
  unlockSkill(id) {
    this.skillsTree.unlockSkill(id);
    return this.getSkillById(id);
  }
}
