enum Status {
    Late,
    ToDo,
    Done
}

class Task {
    title: string;
    days_till_undone?: number;
    done_at?: Date;

    constructor({ title, days_till_undone, done_at }: TaskConstructorInterface) {
        this.title = title;
        this.days_till_undone = days_till_undone;
        this.done_at = done_at;
    }

    public get is_done(): boolean {
        if (this.done_at === undefined) {
            return false;
        }

        let today = new Date();
        return this.undone_at && this.undone_at <= today ? false : true;
    }

    public get undone_at(): Date | undefined {
        if (this.done_at && this.days_till_undone) {
            let undone_at = new Date();
            undone_at.setDate(this.done_at.getDate() + this.days_till_undone);
            return undone_at;
        }
    }

    public get late_at(): Date | undefined {
        if (this.done_at && this.days_till_undone) {
            let late_at = new Date();
            late_at.setDate(this.done_at.getDate() + Math.ceil(this.days_till_undone * 1.5));
            return late_at;
        }
    }

    undo(): void {
        this.done_at = undefined;
    }


    public get status(): Status {
        let today = new Date();
        
        if (this.is_done) {
            return Status.Done
        } else if (this.late_at && this.late_at <= today) {
            return Status.Late;
        } else {
            return Status.ToDo;
        }
    }

}

interface TaskConstructorInterface {
    title: string;
    days_till_undone?: number;
    done_at?: Date;
}

export { Task, Status };