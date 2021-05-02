import { TaskList, Task } from '../src';

describe('task list behaviour', () => {
    test('create empty task list', () => {
        let task_list = createEmptyList();

        expect(task_list.count).toBe(0);
    })

    test('add a task to the list then remove it', () => {
        let task_list = createEmptyList();
        let task = createSimpleTask();

        task_list.add(task);
        expect(task_list.count).toBe(1);

        task_list.remove(task);
        expect(task_list.count).toBe(0);
    })

    test('task order by status', () => {
        const today = new Date();
        let two_days_ago = new Date();
        two_days_ago.setDate(today.getDate() - 2);
        const task_done = new Task({ title: 'done', done_at: today })
        const task_todo = new Task({ title: 'todo' });
        const task_late = new Task({ title: 'late', done_at: two_days_ago, days_till_undone: 1 });

        const task_list = createEmptyList();
        task_list.add(task_done);
        task_list.add(task_todo);
        task_list.add(task_late);

        const expected_order = [task_late, task_todo, task_done];

        // Check test consistency
        expect(task_list.count).toBe(expected_order.length);

        const task_iterator = task_list.getIterator();
        while (!task_iterator.done) {
            const task = task_iterator.next();
            expect(task).toBeInstanceOf(Task);

            const expected_task = expected_order[task_iterator.current_index];
            expect(expected_task).toBeInstanceOf(Task);

            expect(task).toEqual(expected_task);
        }
    })

    test('done task order by title', () => {
        const today = new Date();
        const task_done_1 = new Task({ title: 'done first', done_at: today })
        const task_done_2 = new Task({ title: 'done second', done_at: today })

        const task_list = createEmptyList();
        task_list.add(task_done_2);
        task_list.add(task_done_1);

        const expected_order = [task_done_1, task_done_2];

        // Check test consistency
        expect(task_list.count).toBe(expected_order.length);

        const task_iterator = task_list.getIterator();
        while (!task_iterator.done) {
            const task = task_iterator.next();
            expect(task).toBeInstanceOf(Task);

            const expected_task = expected_order[task_iterator.current_index];
            expect(expected_task).toBeInstanceOf(Task);

            expect(task).toEqual(expected_task);
        }
    })
})

function createSimpleTask() {
    return new Task({ title: 'nouvelle tâche' });
}

function createEmptyList() {
    return new TaskList();
}
