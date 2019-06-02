import { GraphNode } from '../graph/graph-node';
import { Skill, createSkill } from './skill';
import { SkillDesc } from './skill-desc';
import { SkillTreeDesc } from './skill-tree-desc';
import { SkillDependenciesDesc } from './skill-dependencies-desc';
import { Graph } from '../graph/graph';

/**
 * Skill tree
 */
export class SkillTree extends Graph<Skill> {
    constructor() {
        super();
    }
    /**
     * Loads tree from tree description
     */
    load(treeDesc: SkillTreeDesc): SkillTree {
        if (treeDesc == null) {
            throw new Error('Tree desc is null');
        }
        if (!Array.isArray(treeDesc.skills)) {
            throw new Error('skills are null');
        }
        if (!Array.isArray(treeDesc.skillsDependencies)) {
            throw new Error('skills dependencies are null');
        }

        this.clear();
        for (const skillDesc of treeDesc.skills) {
            this.addSkill(skillDesc);
        }
        for (const skillDep of treeDesc.skillsDependencies) {
            this.addDependencies(skillDep);
        }
        this.resetState();
        return this;
    }
    /**
     * Adds skill
     * @param skillDesc Skill description
     */
    addSkill(skillDesc: SkillDesc) {
        const skill = createSkill(skillDesc);
        const node = new GraphNode(skill.id, skill);
        this.addNode(node);
        return skill;
    }
    /**
     * Add skill dependencies
     * @param skillDeps skill dependencies
     */
    addDependencies(skillDeps: SkillDependenciesDesc) {
        this.addNodeParents(skillDeps.id, skillDeps.dependOnIds);
    }
    /**
     * Unlocks skill
     * @param id skill's id
     */
    unlockSkill(id: number) {
        const skillNode = this.getNodeById(id);
        if (skillNode.data.canBeUnlocked) {
            skillNode.data.isLock = false;
            skillNode.data.canBeUnlocked = false;
            for (const childNode of skillNode.children) {
                this.updateCanBeUnlocked(childNode);
            }
        }
        return skillNode.data;
    }
    /**
     * Gets skill by id
     * @param id skill id
     */
    getSkillById(id: number): Skill {
        const node = this.getNodeById(id);
        return node != null ? node.data : null;
    }
    /**
     * Gets skill's depend On skills
     * @param id skill id
     */
    getSkillDependOns(id: number): Skill[] {
        const node = this.getNodeById(id);
        return node.parents.map(p => (p.data));
    }
    /**
     * Gets skill's dependants
     * @param id skill id
     */
    getSkillDependants(id: number): Skill[] {
        const node = this.getNodeById(id);
        return node.children.map(p => (p.data));
    }
    /**
     * Resets tree state
     */
    resetState() {
        const nodes = this.getNodes();
        for (const node of nodes) {
            node.data.isLock = true;
            node.data.canBeUnlocked = node.parents.length === 0 || false;
        }
    }
    /**
     * Update can be unlocked state of skill
     */
    private updateCanBeUnlocked(skillNode: GraphNode<Skill>) {
        skillNode.data.canBeUnlocked = skillNode.parents.length === 0 || skillNode.parents.every(p => !p.data.isLock);
    }
}
