/**
 * Node of the graph
 */
export class GraphNode<T> {
    private _id: number;
    get id() {
        return this._id;
    }
    private _data: T;
    get data() {
        return this._data;
    }
    parents: GraphNode<T>[];
    children: GraphNode<T>[];
    constructor(id: number, data: T) {
        this._id = id;
        this._data = data;
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