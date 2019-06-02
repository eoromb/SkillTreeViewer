import { GraphNode } from 'src/app/core/graph/graph-node';
import { Skill } from 'src/app/core/skill-tree/skill';
import { Graph } from 'src/app/core/graph/graph';

const lockedColor = '#2B7CEE';
const canBeUnlockedColor = '#2B7C88';
const unlockedColor = '#97C233';

/**
 * Node view model
 */
export interface NodeViewModel {
    id: number;
    label: string;
    color: { background: string };
}
/**
 * Edge view model
 */
export interface EdgeViewModel {
    from: number;
    to: number;
}
/**
 * Tree view model
 */
export interface GraphViewModel {
    nodes: NodeViewModel[];
    edges: EdgeViewModel[];
}

/**
 * Creates node view model
 */
export function createNodeViewMode(node: GraphNode<Skill>): NodeViewModel {
    let color = unlockedColor;
    if (node.data.canBeUnlocked) {
        color = canBeUnlockedColor;
    } else if (node.data.isLock) {
        color = lockedColor;
    }
    return {
        id: node.data.id,
        label: node.data.name,
        color: {
            background: color
        }
    };
}
/**
 * Creates edges view model
 * @param from from node
 * @param to to node
 */
export function createEdgeViewModel(from: GraphNode<Skill>, to: GraphNode<Skill>): EdgeViewModel {
    return { from: from.data.id, to: to.data.id };
}
/**
 * Creates tree view model
 */
export function createGraphViewModel(skillGraph: Graph<Skill>): GraphViewModel {
    const nodes: NodeViewModel[] = [];
    const edges: EdgeViewModel[] = [];
    const allNodes = skillGraph.getNodes();
    const rootNodes = skillGraph.getRootNodes();
    for (const node of allNodes) {
        nodes.push(createNodeViewMode(node));
    }
    // Use BFS
    for (const root of rootNodes) {
        const queue = [root, ...root.children];
        for (const node of queue) {
            for (const child of node.children) {
                edges.push(createEdgeViewModel(node, child));
            }
            queue.push(...node.children);
        }
    }
    return { nodes, edges };
}
