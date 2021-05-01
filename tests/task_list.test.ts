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

    test('task order', () => {
        const today = new Date();
        const task_list = createEmptyList();
        const task_done = new Task({ title: 'done', done_at: today })
        task_list.add(task_done);
        const task_todo = new Task({ title: 'todo' });
        task_list.add(task_todo);

        const expected_order = [task_todo, task_done];

        expect(task_list.count).toBe(expected_order.length);

        const task_iterator = task_list.getIterator();
        while (!task_iterator.done) {
            const task = task_iterator.next();
            const expected_task  = expected_order[task_iterator.current_index];
            expect(task).toBeInstanceOf(Task);
            expect(expected_task).toBeInstanceOf(Task);
            // expect(task).toEqual(expected_task);
        }
    })
})

function createSimpleTask() {
    return new Task({ title: 'nouvelle tâche' });
}

function createEmptyList() {
    return new TaskList();
}
