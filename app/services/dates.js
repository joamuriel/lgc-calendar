import { format, eachYearOfInterval, startOfYear, endOfYear, eachDayOfInterval, isLeapYear, getDayOfYear } from "date-fns";
import esLocale from 'date-fns/locale/es';

// Hoy
const today = new Date();

// Variable de año actual
const currentYear = format(today, 'yyyy');
let currentDate = format(today, "EEEE d 'de' MMMM", { locale: esLocale });
currentDate = currentDate.charAt(0).toUpperCase() + currentDate.slice(1);

// Creo un array con todos los años desde el 1 al 3000
const startFirstDate = new Date(0, 0, 1); // Primer día del año 0
startFirstDate.setFullYear(1);
const endDate = new Date(3000, 0, 1); // Primer día del año 3000
const dates = eachYearOfInterval({ start: startFirstDate, end: endDate });
const years = dates.map(year => format(year, 'yyyy'));

// Todos los aparatos
const groupedYears = [];
for (let i = 0; i < years.length; i += 4) {
  groupedYears.push(years.slice(i, i + 4));
}

// Aparato Actual
const currentYearGroupIndex = groupedYears.findIndex(group => group.includes(currentYear));
const currentAparato = currentYearGroupIndex + 1

// Cuadrante del año actual
const states = ["Asume", "Asimila", "Desafía", "Decide"];
let orderInGroup = -1;
if (currentYearGroupIndex !== -1) {
  const group = groupedYears[currentYearGroupIndex];
  orderInGroup = group.findIndex(year => year === currentYear);
}
let currentYearState = "";
if (orderInGroup !== -1) {
  currentYearState = states[orderInGroup];
}

// Función para calcular los días del año
function calculateYearDays(anoId) {
  const startDate = startOfYear(new Date(parseInt(anoId), 0, 1));
  const endDate = endOfYear(new Date(parseInt(anoId), 11, 31));
  const allDaysOfYear = eachDayOfInterval({ start: startDate, end: endDate });
  const first352Days = allDaysOfYear.slice(0, 352);
  const groupedDays = [];
  for (let i = 0; i < first352Days.length; i += 16) {
    groupedDays.push(first352Days.slice(i, i + 16));
  }
  // Obtener el resto de los días del año
  const leapYear = isLeapYear(startDate);
  const restOfTheYear = leapYear ? allDaysOfYear.slice(352, 366) : allDaysOfYear.slice(352, 365);

  return { groupedDays, restOfTheYear, leapYear };
}

// Vuelta actual
const { groupedDays, leapYear } = calculateYearDays(currentYear);
let currentGroupIndex = -1; // Por defecto, si no se encuentra, el valor será -1
currentGroupIndex = groupedDays.findIndex(group => group.some(day => day.getDate() === today.getDate() && day.getMonth() === today.getMonth() && day.getFullYear() === today.getFullYear()));
const currentVuelta = currentGroupIndex + 1

// Día actual
const currentDay = getDayOfYear(today)
const currentDayNegative = currentDay - (leapYear ? 366 : 365) + 1


// Función para calcular día solar desde el año 0 (ajustada para coincidir con Ale)
function calculateSolarDay(day) {
  const year = day.getFullYear();
  
  // Calcular días desde el año 0 hasta el año anterior
  let totalDays = 0;
  
  for (let y = 0; y < year; y++) {
    if (isLeapYear(new Date(y, 0, 1))) {
      totalDays += 366;
    } else {
      totalDays += 365;
    }
  }
  
  // Sumar los días del año actual hasta la fecha indicada
  totalDays += getDayOfYear(day);
  
  // Ajuste para coincidir con el cálculo de Ale (restar 363 días)
  totalDays -= 363;
  
  return totalDays;
}

// Ejemplo de uso:
console.log(calculateSolarDay(today)); 


export { currentYear, years, groupedYears, currentDate, today, currentYearState, currentAparato, calculateYearDays, calculateSolarDay, currentVuelta, currentDay, currentDayNegative };