import { Skill } from 'src/app/core/skill-tree/skill';

/**
 * Skill view model
 */
export interface SkillViewModel extends Skill {
    dependOns: SkillViewModel[];
    dependants: SkillViewModel[];
}
/**
 * Creates skill view model
 */
export function createSkillViewModel(skill: Skill, dependOns: Skill[] = [], dependants: Skill[] = []): SkillViewModel {
    return {
        ...skill,
        dependOns: dependOns.map(d => createSkillViewModel(d)),
        dependants: dependants.map(d => createSkillViewModel(d))
    };
}
