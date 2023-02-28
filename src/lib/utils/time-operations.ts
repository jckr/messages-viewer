export function subtract(date: string, operand: number, unit: 'year' | 'month' | 'week' | 'day') {
    let year = Number(date.slice(0, 4));
    let month = Number(date.slice(5, 7)) - 1;
    let day = Number(date.slice(8, 10));

    switch(unit) {
        case 'year':
            year -= operand;
            break;
        case 'month':
            month -= operand;
            break;
        case 'week': 
            day -= (7 * operand);
            break;
        case 'day':
            day -= operand;
    }
    return new Date(year, month,day).toISOString().slice(0, 10);
}