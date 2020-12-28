export const part1 = (input: string) => crabCups(input, input.length, 100).join("");
export const part2 = (input: string) =>
    crabCups(input, 1_000_000, 10_000_000)
        .slice(0, 2)
        .reduce((prod, x) => prod * x);

function crabCups(input: string, numCups: number, numRounds: number): number[] {
    const { min, max, index } = buildCircle(getLabels(input, numCups));
    let current = index.values().next().value as Node; // Map returns the nodes in insertion order.
    for (let round = 0; round < numRounds; round++) {
        // Remove three cups.
        const firstRemoved = current.next;
        const lastRemoved = firstRemoved.next.next;
        const afterRemoved = lastRemoved.next;
        const removedLabels = [firstRemoved.label, firstRemoved.next.label, lastRemoved.label];
        current.next = afterRemoved;
        afterRemoved.previous = current;

        // Find the destination.
        let destinationLabel = current.label;
        do {
            destinationLabel = destinationLabel - 1;
            if (destinationLabel < min) {
                destinationLabel = max;
            }
        } while (removedLabels.includes(destinationLabel));
        const beforeDestination = index.get(destinationLabel)!;
        const afterDestination = beforeDestination.next;

        // Insert the removed nodes between beforeDestination and afterDestination.
        beforeDestination.next = firstRemoved;
        firstRemoved.previous = beforeDestination;
        lastRemoved.next = afterDestination;
        afterDestination.previous = lastRemoved;

        // Make the next cup clockwise from current the new current cup.
        current = current.next;
    }
    const firstEight: number[] = [];
    let node = index.get(1)!;
    for (let i = 0; i < 8; i++) {
        node = node?.next;
        firstEight.push(node.label);
    }
    return firstEight;
}

function* getLabels(input: string, numCups: number) {
    let maxValue = -Infinity;
    for (let i = 0; i < numCups; i++) {
        if (i < input.length) {
            const val = parseInt(input[i], 10);
            maxValue = Math.max(maxValue, val);
            yield val;
        } else {
            yield ++maxValue;
        }
    }
}

function buildCircle(
    labels: Iterable<number>,
): { min: number; max: number; index: Map<number, Node> } {
    const it = labels[Symbol.iterator]();
    const firstNode = { label: it.next().value } as Node;
    const index = new Map<number, Node>([[firstNode.label, firstNode]]);
    let min = firstNode.label;
    let max = firstNode.label;
    let previousNode = firstNode;
    for (let itResult = it.next(); !itResult.done; itResult = it.next()) {
        const label = itResult.value;
        const thisNode = { label, previous: previousNode } as Node;
        previousNode.next = thisNode;
        index.set(label, thisNode);
        min = Math.min(min, label);
        max = Math.max(max, label);
        previousNode = thisNode;
    }
    previousNode.next = firstNode;
    firstNode.previous = previousNode;
    return { min, max, index };
}

type Node = {
    label: number;
    next: Node;
    previous: Node;
};
