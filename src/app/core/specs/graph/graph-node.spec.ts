import { GraphNode } from '../../graph/graph-node';
import {nodes} from './test-data';

/**
 * Tests for graph node
 */
describe('GraphNode', () => {
    let node: GraphNode<number>;
    beforeEach(() => {
        node = new GraphNode<number>(nodes[0].id, nodes[0].data);
    });
    it('should set id and data on creation', () => {
        expect(node.id).toEqual(nodes[0].id);
        expect(node.data).toEqual(nodes[0].data);
    });
    it('should add node parents. children of parents should be current node', () => {
        const parentNode = new GraphNode<number>(nodes[1].id, nodes[1].data);
        node.addParents([parentNode]);
        expect(node.parents.length).toEqual(1);
        expect(node.parents[0].id).toEqual(parentNode.id);
        expect(parentNode.children.length).toEqual(1);
        expect(parentNode.children[0].id).toEqual(node.id);
    });
});
