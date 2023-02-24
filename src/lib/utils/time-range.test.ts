import { getInterval, getRange } from "./time-range";

describe('Time range utils works as intended', () => {
    test('getInterval for 10 years returns months/quarters/years', () => {
        const d0 = new Date(2010, 0, 1);
        const d1 = new Date(2020, 0, 1);
        expect(getInterval(d0, d1, 'FINE')).toBe('MONTH');
        expect(getInterval(d0, d1)).toBe('QUARTER');
        expect(getInterval(d0, d1, 'COARSE')).toBe('YEAR');
    })
    test('getInterval for 3 years returns weeks/months/quarters', () => {
        const d0 = new Date(2018, 0, 1);
        const d1 = new Date(2021, 0, 1);
        expect(getInterval(d0, d1, 'FINE')).toBe('WEEK');
        expect(getInterval(d0, d1)).toBe('MONTH');
        expect(getInterval(d0, d1, 'COARSE')).toBe('QUARTER');
    })
    test('getInterval for 18 months returns weeks/weeks/months', () => {
        const d0 = new Date(2018, 6, 1);
        const d1 = new Date(2020, 0, 1);
        expect(getInterval(d0, d1, 'FINE')).toBe('WEEK');
        expect(getInterval(d0, d1)).toBe('WEEK');
        expect(getInterval(d0, d1, 'COARSE')).toBe('QUARTER');
    })
    test('getInterval for 5 months returns days/weeks/months', () => {
        const d0 = new Date(2019, 7, 1);
        const d1 = new Date(2020, 0, 1);
        expect(getInterval(d0, d1, 'FINE')).toBe('DAY');
        expect(getInterval(d0, d1)).toBe('WEEK');
        expect(getInterval(d0, d1, 'COARSE')).toBe('MONTH');
    })
    test('getInterval for 3 days returns hours/hours/days', () => {
        const d0 = new Date(2020, 0, 1);
        const d1 = new Date(2020, 0, 4);
        expect(getInterval(d0, d1, 'FINE')).toBe('HOUR');
        expect(getInterval(d0, d1)).toBe('HOUR');
        expect(getInterval(d0, d1, 'COARSE')).toBe('DAY');
    })

    test('getRange when interval falls neatly on start and end dates works as expected', () => {
        const d0 = new Date(2015, 0, 1);
        const d1 = new Date(2019, 11, 31);
        const range = getRange(d0, d1, 'COARSE');
        console.log(range);
        expect(range.length).toBe(5);
        expect(range[4].end.valueOf()).toBe(d1.valueOf());
    })
    test('getRange when interval doesn\'t falls neatly on start and end dates works as expected', () => {
        const d0 = new Date(2015, 0, 1);
        const d1 = new Date(2020, 5, 15);
        const range = getRange(d0, d1, 'COARSE');
        console.log(range);
        expect(range.length).toBe(6);
        expect(range[5].end.valueOf()).toBe(d1.valueOf());
    })
})