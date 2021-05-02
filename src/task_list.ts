import { Task } from './task';

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

    *[Symbol.iterator]() { return this.tasks }
}

export { TaskList };