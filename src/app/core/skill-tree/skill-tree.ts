import { GraphNode } from '../graph/graph-node';
import { Skill, createSkill } from './skill';
import { SkillDesc } from './skill-desc';
import { SkillTreeDesc } from './skill-tree-desc';
import { SkillDependency } from './skill-dependencies';
import { Graph } from '../graph/graph';

export class SkillTree extends Graph<Skill> {

    static createSkillTree(treeDesc: SkillTreeDesc): SkillTree {
        if (treeDesc == null) {
            throw new Error('Tree desc is null');
        }
        if (!Array.isArray(treeDesc.skills)) {
            throw new Error('skills are null');
        }
        if (!Array.isArray(treeDesc.skillsDependencies)) {
            throw new Error('skills dependencies are null');
        }

        const skillTree = new SkillTree();
        for (const skillDesc of treeDesc.skills) {
            skillTree.addSkill(skillDesc);
        }
        for (const skillDep of treeDesc.skillsDependencies) {
            skillTree.addDependencies(skillDep);
        }
        skillTree.resetState();

        return skillTree;
    }

    constructor() {
        super();
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
    addDependencies(skillDeps: SkillDependency) {
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
                this.updateCanBeUnlocked(childNode)
            }
        }
        return skillNode.data;
    }
    /**
     * Gets skill by id
     * @param id skill id
     */
    getSkillById(id: number): Skill {
        const skillNode = this.nodesByIdMap.get(id);
        return skillNode != null ? skillNode.data : null;
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
    private updateCanBeUnlocked(skillNode: GraphNode<Skill>) {
        skillNode.data.canBeUnlocked = skillNode.parents.length === 0 || skillNode.parents.every(p => !p.data.isLock);
    }
}
