class Task {
    title: string;
    time_till_undone: number | undefined;
    done_at: Date | undefined;

    constructor(title: string, time_till_undone?: number, done_at?: Date) {
        this.title = title;
        this.time_till_undone = time_till_undone;
        this.done_at = done_at;
    }

    
    public get is_done() : boolean {
        return this.done_at ? true : false;
    }
    
}

export { Task };