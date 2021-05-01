import { TaskList, Task } from '../src';

describe('task list behaviour', () => {
    test('create empty task list', () => {
        let task_list = new TaskList();
        expect(task_list.count()).toBe(0);
    })

    test('add a task to the list', () => {
        let task_list = new TaskList();
        let task = new Task({title: 'nouvelle tâche'});
        task_list.add(task);
        expect(task_list.count()).toBe(1);
    })
})