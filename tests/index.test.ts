import { Task } from '../src';

test('create non-recurring task not done', () => {
    let task = new Task({title: 'Chore'});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBeUndefined();
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
});

test('create non-recurring task done', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', done_at: done_at});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBeUndefined();
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeTruthy();
});

test('create recurring task not done', () => {
    let task = new Task({title: 'Chore', days_till_undone: 1});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
});

test('create recurring task done', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeTruthy();
});

test('create recurring task undone', () => {
    let done_at = new Date();
    done_at.setDate(done_at.getDate() - 1);
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeFalsy();
});
