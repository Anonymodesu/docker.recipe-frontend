import * as d3 from 'd3';
import jackdonsMeals from '../resources/jackdons_meals.csv'

export function loadJackdonsMeals() {
    const records: any[] = [];
    console.log(jackdonsMeals)
    d3.csv(jackdonsMeals)
        .then(data => data.forEach(record => records.push(record)))
        .then((_: void) => console.log(records))

    return records;
}
