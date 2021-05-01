import { TaskList, Task } from '../src';

describe('task list behaviour', () => {
    test('create empty task list', () => {
        let task_list = createEmptyList();

        expect(task_list.count).toBe(0);
    })

    test('add a task to the list', () => {
        let task_list = createEmptyList();
        let task = createSimpleTask();

        task_list.add(task);

        expect(task_list.count).toBe(1);
    })

    test.todo('remove task')

    test.todo('task sort')
})

function createSimpleTask() {
    return new Task({ title: 'nouvelle tâche' });
}

function createEmptyList() {
    return new TaskList();
}
