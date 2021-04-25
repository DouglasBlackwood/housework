import { Task } from '../src';

test('create non-recurring task not done', () => {
    let task = new Task({title: 'Chore'});

    expect(task.title).toBe('Chore');
    expect(task.time_till_undone).toBeUndefined();
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
});

test('create non-recurring task done', () => {
    let task = new Task({title: 'Chore', done_at: new Date()});

    expect(task.title).toBe('Chore');
    expect(task.time_till_undone).toBeUndefined();
    expect(task.done_at).toBeDefined();
    expect(task.is_done).toBeTruthy();
});
