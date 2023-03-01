import { subtract } from "./time-operations";

test('removing 5 years', () => {
    const d = '2020-10-05';
    expect(subtract(d, 5, 'year')).toBe('2015-10-05');
})

test('removing 5 months', () => {
    const d = '2020-02-05';
    expect(subtract(d, 5, 'month')).toBe('2019-09-05');
})

test('removing 5 weeks', () => {
    const d = '2020-10-05';
    expect(subtract(d, 5, 'week')).toBe('2020-08-31');
})

test('removing 5 days', () => {
    const d = '2020-10-05';
    expect(subtract(d, 5, 'day')).toBe('2020-09-30');
})

test('removing 1 week', () => {
    const d = '2023-02-28';
    expect(subtract(d, 1, 'week')).toBe('2023-02-21');
})