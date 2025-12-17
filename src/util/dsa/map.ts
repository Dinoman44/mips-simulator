class TwoWayMap<A, B> {
    private mapAtoB: Map<A, B>;
    private mapBtoA: Map<B, A>;

    constructor(pairs: [A, B][]) {
        this.mapAtoB = new Map<A, B>(pairs);
        this.mapBtoA = new Map<B, A>(pairs.map(([a, b]) => [b, a]));
    }

    getB(a: A): B | undefined {
        return this.mapAtoB.get(a);
    }

    isValidA(a: A): boolean {
        return this.mapAtoB.has(a);
    }

    getA(b: B): A | undefined {
        return this.mapBtoA.get(b);
    }

    isValidB(b: B): boolean {
        return this.mapBtoA.has(b);
    }

    getAllA(): A[] {
        return Array.from(this.mapAtoB.keys());
    }
    
    getAllB(): B[] {
        return Array.from(this.mapBtoA.keys());
    }
}

export { TwoWayMap };