class Task {
    title: string;
    time_till_undone?: number;
    done_at?: Date;

    constructor({title, time_till_undone, done_at}: TaskConstructorInterface) {
        this.title = title;
        this.time_till_undone = time_till_undone;
        this.done_at = done_at;
    }

    public get is_done(): boolean {
        return this.done_at ? true : false;
    }

}

interface TaskConstructorInterface {
    title: string;
    time_till_undone?: number;
    done_at?: Date;
}

export { Task };