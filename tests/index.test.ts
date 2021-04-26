import { Task, Status } from '../src';

test('create non-recurring task not done', () => {
    let task = new Task({title: 'Chore'});

    expect(task.title).toBe('Chore');
    expect(task.days_till_undone).toBeUndefined();
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
    expect(task.status).toBe(Status.ToDo);
});

test('create non-recurring task done', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', done_at: done_at});

    expect(task.days_till_undone).toBeUndefined();
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeTruthy();
    expect(task.status).toBe(Status.Done);
});

test('create recurring task not done', () => {
    let task = new Task({title: 'Chore', days_till_undone: 1});

    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBeUndefined();
    expect(task.is_done).toBeFalsy();
    expect(task.status).toBe(Status.ToDo);
});

test('create recurring task done', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});

    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeTruthy();
    expect(task.status).toBe(Status.Done);
});

test('create recurring task undone', () => {
    let done_at = new Date();
    done_at.setDate(done_at.getDate() - 1);
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});

    expect(task.days_till_undone).toBe(1);
    expect(task.done_at).toBe(done_at);
    expect(task.is_done).toBeFalsy();
    expect(task.status).toBe(Status.ToDo);
});

test('undo task', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', done_at: done_at});
    task.undo();

    expect(task.is_done).toBeFalsy();
});

test('create recurring task late', () => {
    let done_at = new Date();
    done_at.setDate(done_at.getDate() - 2);
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});
    
    expect(task.status).toBe(Status.Late);
});

test('task due every 1 day is late after 2 days', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', days_till_undone: 1, done_at: done_at});

    let expected_late_at = new Date(done_at.getTime());
    expected_late_at.setDate(done_at.getDate() + 2);

    expect(task.late_at).toStrictEqual(expected_late_at);
})

test('task due every 2 day is late after 3 days', () => {
    let done_at = new Date();
    let task = new Task({title: 'Chore', days_till_undone: 2, done_at: done_at});

    let expected_late_at = new Date(done_at.getTime());
    expected_late_at.setDate(done_at.getDate() + 3);

    expect(task.late_at).toStrictEqual(expected_late_at);
})
