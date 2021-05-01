import { Task } from './task';

class TaskList {
    data: Task[] = [];

    public get count(): number {
        return this.data.length;
    }

    add(task: Task): void {
        this.data.push(task);
    }
}

export { TaskList };