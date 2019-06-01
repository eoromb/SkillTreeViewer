import { SkillDesc } from './skill-desc';

/**
 * Skill model
 */
export interface Skill extends SkillDesc {
    isLock: boolean;
    canBeUnlocked: boolean;
}
export function createSkill(skillDesc: SkillDesc) {
    return { ...skillDesc, isLock: true, canBeUnlocked: false };
}
