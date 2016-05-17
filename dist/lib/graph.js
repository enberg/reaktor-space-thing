"use strict";
class Graph {
    constructor(nodes = new Map, edges = new Map) {
        this.nodes = nodes;
        this.edges = edges;
    }
    addNode(name, node) {
        if (this.nodes.has(name)) {
            throw "Graph already contains the node " + name;
        }
        this.nodes.set(name, node);
        this.edges.set(name, new Map);
    }
    addEdge(fromNode, toNode, distance) {
        if (!this.nodes.has(fromNode) || !this.nodes.has(toNode)) {
            throw "Graph needs to contain both nodes";
        }
        this.edges.get(fromNode).set(toNode, distance);
    }
    traverse(start, end) {
        if (!this.nodes.has(start) || !this.nodes.has(end)) {
            throw "Both " + start + " and " + end + " need to be nodes in the graph";
        }
        let visited = new Map();
        let path = new Map();
        visited.set(start, 0);
        let nodes = new Set(this.nodes.keys());
        while (nodes.size > 0) {
            let min = null;
            nodes.forEach(name => {
                if (visited.has(name)) {
                    if (!min || visited.get(name) < visited.get(min)) {
                        min = name;
                    }
                }
            });
            if (!min)
                break;
            nodes.delete(min);
            let currentDistance = visited.get(min);
            this.edges.get(min).forEach((edgeDistance, name) => {
                let completeDistance = currentDistance + edgeDistance;
                if (!visited.has(name) || completeDistance < visited.get(name)) {
                    visited.set(name, completeDistance);
                    path.set(name, min);
                }
            });
        }
        let route = new Array();
        let step = end;
        while (step !== start) {
            route.unshift(this.nodes.get(step));
            step = path.get(step);
        }
        route.unshift(this.nodes.get(step));
        return route;
    }
}
exports.Graph = Graph;
