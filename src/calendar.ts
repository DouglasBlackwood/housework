class Calendar {
    static readonly millisecond_in_a_day: number = (1000 * 60 * 60 * 24);

    public static get today(): Date {
        return new Date();
    }
}

export { Calendar };