import { SkillTree } from 'src/app/core/skill-tree/skill-tree';
import { SkillsService } from './skills.service';
import { SkillDesc } from 'src/app/core/skill-tree/skill-desc';

/**
 * Tests of skills service
 */
describe('SkillsService', () => {
  let service: SkillsService;
  let tree: SkillTree;
  let mage: SkillDesc;
  let fireBall: SkillDesc;
  let fireStorm: SkillDesc;

  describe('skill view model', () => {
    beforeEach(() => {
      mage = { name: 'Mage', id: 1 };
      fireBall = { name: 'Fireball', id: 2 };
      fireStorm = { name: 'Firestorm', id: 3 };
      const treeDescription = {
        skills: [mage, fireBall, fireStorm],
        skillsDependencies: [
          { id: fireBall.id, dependOnIds: [mage.id] },
          { id: fireStorm.id, dependOnIds: [fireBall.id] }
        ]
      };
      tree = new SkillTree();
      tree.load(treeDescription);
      service = new SkillsService(tree);
    });
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
    it('should get skill tree', () => {
      expect(service.getSkillTree()).toBe(tree);
    });
    it('should get correct skill view model by id', () => {
      const skill = service.getSkillById(fireBall.id);
      expect(skill.dependOns.length).toEqual(1);
      expect(skill.dependOns[0].id).toEqual(mage.id);
      expect(skill.dependants.length).toEqual(1);
      expect(skill.dependants[0].id).toEqual(fireStorm.id);
    });
  });
  describe('unlocking', () => {
    beforeEach(() => {
      tree = jasmine.createSpyObj('SkillTree', ['unlockSkill', 'getSkillById']);
      service = new SkillsService(tree);
    });
    it('should call unlock method of tree on unlocking', () => {
      const skillId = 1;
      service.unlockSkill(skillId);
      expect(tree.unlockSkill).toHaveBeenCalledWith(skillId);
    });
  });
});
