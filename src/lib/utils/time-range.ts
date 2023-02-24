type Interval = 'YEAR' | 'QUARTER' | 'MONTH' | 'WEEK' | 'DAY' | 'HOUR' | '5MINUTE'
type Granularity = 'FINE' | 'MEDIUM' | 'COARSE';

type TimeBucket = {
    start: Date,
    end: Date
}

const MINUTE = 60000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const WEEK = 7 * DAY;
const MONTH = 30 * DAY;
const QUARTER = 3 * MONTH;
const YEAR = 365 * DAY;

export function getInterval(start: Date, end: Date, granularity: Granularity = 'MEDIUM'): Interval {
    const timeDifference = end.valueOf() - start.valueOf();
    switch(granularity) {
        case 'FINE':
            if (timeDifference > 5 * YEAR) return 'MONTH';
            if (timeDifference > YEAR) return 'WEEK';
            if (timeDifference > 2 * WEEK) return 'DAY';
            if (timeDifference > DAY) return 'HOUR';
            return '5MINUTE';
        case 'MEDIUM':
            if (timeDifference > 10 * YEAR) return 'QUARTER';
            if (timeDifference > 2 * YEAR) return 'MONTH';
            if (timeDifference > QUARTER) return 'WEEK';
            if (timeDifference > WEEK) return 'DAY';
            return 'HOUR';
        case 'COARSE':
            if (timeDifference > 4 * YEAR) return 'YEAR';
            if (timeDifference > YEAR) return 'QUARTER';
            if (timeDifference > QUARTER) return 'MONTH';
            if (timeDifference > MONTH) return 'WEEK';
            return 'DAY';
    }
}

export function getRange(start: Date, end: Date, granularity: Granularity = 'COARSE') {
    const interval = getInterval(start, end, granularity);
    const intervalLength = {
        YEAR,
        QUARTER,
        MONTH,
        WEEK,
        DAY,
        HOUR,
        '5MINUTE': 5 * MINUTE 
    }[interval];
    const range = new Array<TimeBucket>;
    let bucketStart = start;
    while (bucketStart < end) {
        const bucketEnd = new Date(bucketStart.valueOf() + intervalLength);
        range.push({
            start: bucketStart,
            end: bucketEnd > end ? end : bucketEnd
        });
        bucketStart = bucketEnd;
    }
    return range;
}
