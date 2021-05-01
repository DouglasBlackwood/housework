interface Iterator<T> {
    // Return the current element.
    current(): T;

    // Return the current element and move forward to next element.
    next(): T;

    // Return the index of the current element.
    readonly current_index: number;

    // Checks if current position is valid.
    readonly done: boolean;

    // Rewind the Iterator to the first element.
    rewind(): void;
}

export { Iterator };