import { Graph } from '../../graph/graph';
import { nodes } from './test-data';
import { GraphNode } from '../../graph/graph-node';

/**
 * Tests for graph
 */
describe('Graph', () => {
    let graph: Graph<number>;
    let graphNodes: GraphNode<number>[];
    beforeEach(() => {
        graph = new Graph();
        graphNodes = [new GraphNode(nodes[0].id, nodes[0].data), new GraphNode(nodes[1].id, nodes[1].data)];
    });
    it('should throw on getting node which not in graph', () => {
        expect(() => graph.getNodeById(123)).toThrowError();
    });
    it('should add node to graph', () => {
        const node = graphNodes[0];
        graph.addNode(graphNodes[0]);
        const addedNode = graph.getNodeById(node.id);
        expect(addedNode.id).toEqual(node.id);
        expect(addedNode.data).toEqual(node.data);
    });
    it('should throw on adding node to graph twice', () => {
        const node = graphNodes[0];
        graph.addNode(node);
        expect(() => graph.addNode(node)).toThrowError();
    });
    it('should get all nodes from graph', () => {
        graph.addNode(graphNodes[0]);
        graph.addNode(graphNodes[1]);
        expect(graph.getNodes().length).toEqual(2);
    });
    it('should reset graph', () => {
        graph.addNode(graphNodes[0]);
        graph.reset();
        expect(graph.getNodes().length).toEqual(0);
    });
    it('should add parents to node', () => {
        let rootNode = graphNodes[0];
        let childNode = graphNodes[1];

        graph.addNode(rootNode);
        graph.addNode(childNode);
        graph.addNodeParents(childNode.id, [rootNode.id]);

        childNode = graph.getNodeById(childNode.id);
        rootNode = graph.getNodeById(rootNode.id);

        expect(childNode.parents.length).toEqual(1);
        expect(childNode.parents[0].id).toEqual(rootNode.id);

        expect(rootNode.children.length).toEqual(1);
        expect(rootNode.children[0].id).toEqual(childNode.id);
    });
    it('should get only root nodes from graph', () => {
        const rootNode = graphNodes[0];
        const childNode = graphNodes[1];

        graph.addNode(rootNode);
        graph.addNode(childNode);
        graph.addNodeParents(childNode.id, [rootNode.id]);

        const rootNodes = graph.getRootNodes();
        expect(rootNodes.length).toEqual(1);
        expect(rootNodes[0].id).toEqual(rootNode.id);
    });
});
