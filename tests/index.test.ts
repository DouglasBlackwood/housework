import { Task } from '../src';

test('create non-recurring task not done', () => {
    let task = new Task('Chore');

    expect(task.title).toBe('Chore');
    expect(task.time_till_undone).toBeUndefined();
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
});

test.todo('set task done');