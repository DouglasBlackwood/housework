import { Task } from './task';

class TaskList {
    data: Task[] = [];

    public get count(): number {
        return this.data.length;
    }

    add(task: Task): void {
        this.data.push(task);
    }

    remove(task: Task): void {
        let task_index = this.data.indexOf(task);
        this.data.splice(task_index, 1);
    }
}

export { TaskList };