import { Task } from './task';
import { Iterator } from './iterator';

class TaskList {
    private data: Task[] = [];
    
    public get count(): number {
        return this.data.length;
    }

    public get tasks() {
        return this.data.slice();
    }

    add(task: Task): void {
        this.data.push(task);
        this.sort();
    }
    
    sort(): void {
        this.data.sort((a, b) => {
            // Sort by status if status is different
            if (a.status !== b.status) {
                return a.status - b.status;
            }
    
            // Sort by undone_ratio if possible
            if (!a.is_done && !b.is_done && a.undone_ratio !== b.undone_ratio) {
                return b.undone_ratio - a.undone_ratio;
            }
    
            // Sort by title by default
            if (a.title < b.title) {
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