import { SkillDependenciesDesc } from './skill-dependencies-desc';
import { SkillDesc } from './skill-desc';

/**
 * Description of skill tree
 */
export interface SkillTreeDesc {
    skills: SkillDesc[];
    skillsDependencies: SkillDependenciesDesc[];
}
