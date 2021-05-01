import { TaskList } from '../src';

describe('task list behaviour', () => {
    test('create empty task list', () => {
        let task_list = new TaskList();
        expect(task_list.count()).toBe(0);
    })
})