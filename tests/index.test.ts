import { Task } from '../src';

test('create task with title', () => {
    let task = new Task('Chore');

    expect(task.title).toBe('Chore');
});