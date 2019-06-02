import { GraphNode } from './graph-node';

/**
 * Generic graph
 */
export class Graph<T> {
    nodesByIdMap: Map<number, GraphNode<T>>;
    nodes: GraphNode<T>[];

    constructor() {
        this.reset();
    }
    /**
     * Adds node to graph
     */
    addNode(node: GraphNode<T>) {
        if (this.nodesByIdMap.has(node.id)) {
            throw new Error(`Node with id = ${node.id} already added`);
        }
        this.nodes.push(node);
        this.nodesByIdMap.set(node.id, node);
    }
    /**
     * Adds node's parents
     * @param id node to add parents to
     * @param parents parents to add to node
     */
    addNodeParents(id: number, parents: number[]) {
        if (!Array.isArray(parents)) {
            throw new Error('parents is not array');
        }
        const node = this.getNodeById(id);
        const parentsNode = [];
        for (const parentId of parents) {
            const parentNode = this.getNodeById(parentId);
            parentsNode.push(parentNode);
        }
        node.addParents(parentsNode);
    }
    /**
     * Gets root nodes
     */
    getRootNodes() {
        return this.nodes.filter(s => s.parents.length === 0);
    }
    /**
     * Gets all nodes of the graph
     */
    getNodes() {
        return this.nodes;
    }
    /**
     * Checks if node is in graph. Throw exception in case of failure
     * @param id node's id
     */
    getNodeById(id) {
        const node = this.nodesByIdMap.get(id);
        if (node == null) {
            throw new Error(`Node with id = ${id} is not in tree`);
        }
        return node;
    }
    /**
     * Reset graph
     */
    reset() {
        this.nodes = [];
        this.nodesByIdMap = new Map<number, GraphNode<T>>();
    }
}
