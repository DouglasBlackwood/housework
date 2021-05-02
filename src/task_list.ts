import { Task } from './task';
import { Iterator } from './iterator';

class TaskList {
    private data: Task[] = [];

    public get count(): number {
        return this.data.length;
    }

    add(task: Task): void {
        this.data.push(task);
        this.data.sort((a, b) => {
            if (a.status - b.status !== 0) {
                return a.status - b.status;
            } else if (a.title < b.title) {
                return -1;
            } else if (a.title > b.title) {
                return 1;
            } else {
                return 0;
            }
        })
    }

    remove(task: Task): void {
        const task_index = this.data.indexOf(task);
        this.data.splice(task_index, 1);
    }

    public get tasks() {
        return this.data.slice();
    }

    getIterator(): TaskIterator {
        return new TaskIterator(this.tasks);
    }
}

class TaskIterator implements Iterator<Task> {
    private tasks: Task[];
    private next_position: number = 0;

    constructor(tasks: Task[]) {
        this.tasks = tasks
    }

    current(): Task {
        return this.tasks[this.next_position];
    }

    next(): Task {
        const item = this.tasks[this.next_position];
        this.next_position += 1;
        return item;
    }

    public get current_index(): number {
        return this.next_position - 1;
    }

    public get done(): boolean {
        return this.next_position === this.tasks.length;
    }

    rewind(): void {
        this.next_position = 0;
    }
}

export { TaskList };