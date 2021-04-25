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
        if (this.done_at) {
            if (this.undone_at) {
                let today = new Date();
                return this.undone_at > today;
            } else {
                return true
            }
        } else {
            return false;
        }
    }

    public get undone_at(): Date | undefined {
        if (this.done_at && this.days_till_undone) {
            let undone_at = new Date();
            undone_at.setDate(this.done_at.getDate() + this.days_till_undone);
            return undone_at;
        }
    }


}

interface TaskConstructorInterface {
    title: string;
    days_till_undone?: number;
    done_at?: Date;
}

export { Task };