export class Graph<T> {
    constructor(public nodes: Map<string, T> = new Map, public edges: Map<string, Map<string, number>> = new Map) {}
    
    addNode(name: string, node: T) {
        if (this.nodes.has(name)) {
            throw "Graph already contains the node " + name;
        }
        
        this.nodes.set(name, node);
        this.edges.set(name, new Map);
    }
    
    addEdge(fromNode: string, toNode: string, distance: number) {
        if (!this.nodes.has(fromNode) || !this.nodes.has(toNode)) {
            throw "Graph needs to contain both nodes";
        }
        
        this.edges.get(fromNode).set(toNode, distance);
    }
    
    traverse(start: string, end: string) {
        if (!this.nodes.has(start) || !this.nodes.has(end)) {
            throw "Both " + start + " and " + end + " need to be nodes in the graph";
        }
        
        let visited = new Map<string, number>();
        let path = new Map<string, string>();
        
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
            
            if (!min) break;
            
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
        
        let route = new Array<T>();
        let step = end;
        
        while (step !== start) {
            route.unshift(this.nodes.get(step));
            step = path.get(step);
        }
        
        route.unshift(this.nodes.get(step));

        return route;
    }
}