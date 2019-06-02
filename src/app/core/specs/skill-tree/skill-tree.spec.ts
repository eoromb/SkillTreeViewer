import { SkillTree } from '../../skill-tree/skill-tree';
import {skills} from './test-data';
/**
 * Tests for skill tree
 */
describe('SkillTree', () => {
    let tree: SkillTree;
    beforeEach(() => {
        tree = new SkillTree();
    });
    it('should add skill to tree', () => {
        const skillDesc = skills[0];
        tree.addSkill(skillDesc);
        const skill = tree.getSkillById(skillDesc.id);
        expect(skill).not.toBeNull();
        expect(skill.id).toEqual(skillDesc.id);
        expect(skill.name).toEqual(skillDesc.name);
    });
});
