import { Calendar } from './calendar';
import { TaskStatus } from './task_status';


class Task {
    title: string;
    days_till_undone?: number;
    done_at?: Date;

    private late_factor: number = 1.5;

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

    public get status(): TaskStatus {
        if (this.is_done) {
            return TaskStatus.Done
        } else if (this.is_late) {
            return TaskStatus.Late;
        } else {
            return TaskStatus.ToDo;
        }
    }

    undo(): void {
        this.done_at = undefined;
    }

    setDoneAt(done_at: Date): void {
        this.done_at = done_at;
    }

    setDaysTillUndone(days_till_undone: number): void {
        this.days_till_undone = days_till_undone;
    }

    setTitle(title: string): void {
        this.title = title;
    }

    public get undone_ratio(): number {
        if (this.done_since && this.days_till_undone) {
            return this.done_since / this.days_till_undone
        } else {
            return 0;
        }
    }

    public get done_since(): number | undefined {
        if (this.done_at) {
            const done_since_in_ms = Calendar.today.getTime() - this.done_at.getTime();
            return done_since_in_ms / Calendar.millisecond_in_a_day;
        }
    }

}

interface TaskConstructorInterface {
    title: string;
    days_till_undone?: number;
    done_at?: Date;
}

export { Task };