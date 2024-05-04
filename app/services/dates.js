import { format, eachYearOfInterval } from "date-fns";

// Variable de año actual
const today = new Date();
const currentYear = format(today, 'yyyy');

// Creo un array con todos los años desde el 1 al 3000
const startFirstDate = new Date(0, 0, 1); // Primer día del año 0
startFirstDate.setFullYear(1);
const endDate = new Date(3000, 0, 1); // Primer día del año 3000
const dates = eachYearOfInterval({ start: startFirstDate, end: endDate });

// Variable array con todos los años
const years = dates.map(year => format(year, 'yyyy'));

// variable array de los aparatos (grupo de 4 años)
const groupedYears = [];
for (let i = 0; i < years.length; i += 4) {
  groupedYears.push(years.slice(i, i + 4));
}

export { currentYear, years, groupedYears };