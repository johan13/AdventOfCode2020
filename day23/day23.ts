export const part1 = (input: string) => crabCups(input, input.length, 100).join("");
export const part2 = (input: string) =>
    crabCups(input, 1_000_000, 10_000_000)
        .slice(0, 2)
        .reduce((prod, x) => prod * x);

type Node = {
    label: number;
    next: Node;
};

function crabCups(input: string, numCups: number, numRounds: number): number[] {
    const { firstNode, index, minLabel, maxLabel } = buildCircle(getLabels(input, numCups));
    let current = firstNode;
    for (let round = 0; round < numRounds; round++) {
        const { firstRemoved, lastRemoved, removedLabels } = removeNextThree(current);
        const destination = findDestination(current, index, minLabel, maxLabel, removedLabels);
        insertAfter(destination, firstRemoved, lastRemoved);
        current = current.next;
    }
    return nextEightLabels(index[1]);
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

function buildCircle(labels: Iterable<number>) {
    const it = labels[Symbol.iterator]();
    const firstNode = { label: it.next().value } as Node;
    const index = [];
    index[firstNode.label] = firstNode;
    let minLabel = firstNode.label;
    let maxLabel = firstNode.label;
    let previousNode = firstNode;
    for (let itResult = it.next(); !itResult.done; itResult = it.next()) {
        const label = itResult.value;
        const thisNode = { label } as Node;
        previousNode.next = thisNode;
        index[label] = thisNode;
        minLabel = Math.min(minLabel, label);
        maxLabel = Math.max(maxLabel, label);
        previousNode = thisNode;
    }
    previousNode.next = firstNode;
    return { firstNode, index, minLabel, maxLabel };
}

function removeNextThree(current: Node) {
    const firstRemoved = current.next;
    const lastRemoved = firstRemoved.next.next;
    const removedLabels = [firstRemoved.label, firstRemoved.next.label, lastRemoved.label];
    current.next = lastRemoved.next;
    return { firstRemoved, lastRemoved, removedLabels };
}

function findDestination(
    current: Node,
    index: Node[],
    minLabel: number,
    maxLabel: number,
    removedLabels: number[],
) {
    let destinationLabel = current.label;
    do {
        if (--destinationLabel < minLabel) {
            destinationLabel = maxLabel;
        }
    } while (removedLabels.includes(destinationLabel));
    return index[destinationLabel];
}

function insertAfter(destination: Node, insertHead: Node, insertTail: Node) {
    insertTail.next = destination.next;
    destination.next = insertHead;
}

function nextEightLabels(node: Node) {
    const list = [];
    for (let i = 0; i < 8; i++) {
        node = node.next;
        list.push(node.label);
    }
    return list;
}
