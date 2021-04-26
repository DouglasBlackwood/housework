import { Calendar } from './calendar';

enum Status {
    Late,
    ToDo,
    Done
}

class Task {
    title: string;
    days_till_undone?: number;
    done_at?: Date;

    late_factor: number = 1.5;

    constructor({ title, days_till_undone, done_at }: TaskConstructorInterface) {
        this.title = title;
        this.days_till_undone = days_till_undone;
        this.done_at = done_at;
    }

    public get is_done(): boolean {
        if (this.done_at === undefined) {
            return false;
        }

        return this.undone_at && this.undone_at <= Calendar.today ? false : true;
    }

    public get undone_at(): Date | undefined {
        if (this.done_at && this.days_till_undone) {
            let undone_at = new Date(this.done_at.getTime());
            undone_at.setDate(this.done_at.getDate() + this.days_till_undone);
            return undone_at;
        }
    }

    public get is_late(): boolean {
        return this.late_at && this.late_at <= Calendar.today ? true : false;
    }

    public get late_at(): Date | undefined {
        if (this.done_at && this.days_till_late) {
            let late_at = new Date(this.done_at.getTime());
            late_at.setDate(this.done_at.getDate() + this.days_till_late);
            return late_at;
        }
    }

    public get days_till_late(): number | undefined {
        if (this.days_till_undone) {
            return Math.ceil(this.days_till_undone * this.late_factor)
        }
    }

    public get status(): Status {
        if (this.is_done) {
            return Status.Done
        } else if (this.is_late) {
            return Status.Late;
        } else {
            return Status.ToDo;
        }
    }

    undo(): void {
        this.done_at = undefined;
    }

}

interface TaskConstructorInterface {
    title: string;
    days_till_undone?: number;
    done_at?: Date;
}

export { Task, Status };