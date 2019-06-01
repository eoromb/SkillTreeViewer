/**
 * Node of the graph
 */
export class GraphNode<T> {
    id: number;
    data: T;
    parents: GraphNode<T>[];
    children: GraphNode<T>[];
    constructor(id: number, data: T) {
        this.id = id;
        this.data = data;
        this.parents = [];
        this.children = [];
    }
    /**
     * Adds parent to graph nodes
     */
    addParents(parents: GraphNode<T>[]) {
        for (const parent of parents) {
            if (this.parents.find(p => p.id === parent.id) == null) {
                this.parents.push(parent);
            }
            if (parent.children.find(p => p.id === this.id) == null) {
                parent.children.push(this);
            }
        }
    }
}