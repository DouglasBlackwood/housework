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

        let i = 0;
        for (const task of task_list) {
            const expected_task = expected_order[i];
            expect(task).toEqual(expected_task);
            i++;
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

        let i = 0;
        for (const task of task_list) {
            const expected_task = expected_order[i];
            expect(task).toEqual(expected_task);
            i++;
        }
    })

    test('todo task order by undone ratio, then by title', () => {
        const today = new Date();
        let five_days_ago = new Date();
        five_days_ago.setDate(today.getDate() - 5);
        let six_days_ago = new Date();
        six_days_ago.setDate(today.getDate() - 6);
        const task_done_1 = new Task({ title: 'todo first', days_till_undone: 1, done_at: six_days_ago })
        const task_done_2 = new Task({ title: 'todo second', days_till_undone: 1, done_at: five_days_ago })
        const task_done_3 = new Task({ title: 'todo third', days_till_undone: 1, done_at: five_days_ago })

        const task_list = createEmptyList();
        task_list.add(task_done_3);
        task_list.add(task_done_2);
        task_list.add(task_done_1);

        const expected_order = [task_done_1, task_done_2, task_done_3];

        // Check test consistency
        expect(task_list.count).toBe(expected_order.length);
        expect(task_done_1.undone_ratio).toBeCloseTo(6);
        expect(task_done_2.undone_ratio).toBeCloseTo(5);
        expect(task_done_3.undone_ratio).toBeCloseTo(5);

        let i = 0;
        for (const task of task_list) {
            const expected_task = expected_order[i];
            expect(task).toEqual(expected_task);
            i++;
        }
    })
})

function createSimpleTask() {
    return new Task({ title: 'nouvelle tâche' });
}

function createEmptyList() {
    return new TaskList();
}
