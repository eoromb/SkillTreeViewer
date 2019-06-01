import { SkillDependency } from './skill-dependencies';
import { SkillDesc } from './skill-desc';

/**
 * Description of skill tree
 */
export interface SkillTreeDesc {
    skills: SkillDesc[];
    skillsDependencies: SkillDependency[];
}