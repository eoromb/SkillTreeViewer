import { SkillTree } from '../../skill-tree/skill-tree';
import { skills } from './test-data';
/**
 * Tests for skill tree
 */
describe('SkillTree', () => {
    let tree: SkillTree;
    beforeEach(() => {
        tree = new SkillTree();
    });
    /**
     * Tests of basic operation
     */
    describe('adding and getting', () => {
        it('should add skill to tree and get it by id', () => {
            const skillDesc = skills[0];
            tree.addSkill(skillDesc);
            const skill = tree.getSkillById(skillDesc.id);
            expect(skill).not.toBeNull();
            expect(skill.id).toEqual(skillDesc.id);
            expect(skill.name).toEqual(skillDesc.name);
        });
    });
    /**
     * Tests of dependencies operation
     */
    describe('dependencies', () => {
        let skill = skills[1];
        let dependOnSkill = skills[0];
        beforeEach(() => {
            skill = skills[1];
            dependOnSkill = skills[0];
            tree.addSkill(dependOnSkill);
            tree.addSkill(skill);
            tree.addDependencies({ id: skill.id, dependOnIds: [dependOnSkill.id] });
        });
        it('should get skill dependOn', () => {
            const dependOns = tree.getSkillDependOns(skill.id);
            expect(dependOns.length).toEqual(1);
            expect(dependOns[0].id).toEqual(dependOnSkill.id);
        });
        it('should get skill dependants', () => {
            const dependencies = tree.getSkillDependants(dependOnSkill.id);
            expect(dependencies.length).toEqual(1);
            expect(dependencies[0].id).toEqual(skill.id);
        });
    });
    /**
     * Tests of unlocking operation
     */
    describe('unlocking', () => {
        let skill = skills[1];
        let rootSkill = skills[0];
        beforeEach(() => {
            skill = skills[1];
            rootSkill = skills[0];
            tree.addSkill(rootSkill);
            tree.addSkill(skill);
            tree.addDependencies({ id: skill.id, dependOnIds: [rootSkill.id] });
            tree.resetState();
        });
        it('should have all skills locked', () => {
            expect(tree.getSkillById(rootSkill.id).isLock).toBeTruthy();
            expect(tree.getSkillById(skill.id).isLock).toBeTruthy();
        });
        it('should have only root skill can be unlocked', () => {
            expect(tree.getSkillById(rootSkill.id).canBeUnlocked).toBeTruthy();
            expect(tree.getSkillById(skill.id).canBeUnlocked).toBeFalsy();
        });
        it('should not unlock skill which cant be unlocked', () => {
            tree.unlockSkill(skill.id);
            expect(tree.getSkillById(skill.id).isLock).toBeTruthy();
        });
        it('should unlock skill which can be unlock', () => {
            tree.unlockSkill(rootSkill.id);
            expect(tree.getSkillById(rootSkill.id).isLock).toBeFalsy();
        });
        it('should be changed can be unlocked of dependants skills after unlocking', () => {
            tree.unlockSkill(rootSkill.id);
            expect(tree.getSkillById(skill.id).canBeUnlocked).toBeTruthy();
        });
    });
    /**
     * Tests of loading operation
     */
    describe('loading', () => {
        let rootSkill;
        let skill;
        beforeEach(() => {
            rootSkill = skills[0];
            skill = skills[1];
            const treeDescription = {
                skills: [rootSkill, skill],
                skillsDependencies: [{ id: skill.id, dependOnIds: [rootSkill.id] }]
            };
            tree.load(treeDescription);
        });
        it('should have right structure', () => {
            const dependOns = tree.getSkillDependOns(skill.id);
            expect(dependOns.length).toEqual(1);
            expect(dependOns[0].id).toEqual(rootSkill.id);

            const dependencies = tree.getSkillDependants(rootSkill.id);
            expect(dependencies.length).toEqual(1);
            expect(dependencies[0].id).toEqual(skill.id);
        });
        it('should have all skills locked', () => {
            expect(tree.getSkillById(rootSkill.id).isLock).toBeTruthy();
            expect(tree.getSkillById(skill.id).isLock).toBeTruthy();
        });
        it('should have only root skill can be unlocked', () => {
            expect(tree.getSkillById(rootSkill.id).canBeUnlocked).toBeTruthy();
            expect(tree.getSkillById(skill.id).canBeUnlocked).toBeFalsy();
        });
    });
});
