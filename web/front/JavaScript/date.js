lg(GetScriptName());

const millisonSeconds = 1000;

let now = new Date(); 
lg(now); // Sun Apr 19 2020 12:39:56 GMT+0800

let oneDayAgo = new Date(-24*60*60*millisonSeconds);
lg(oneDayAgo); // Wed Dec 31 1969 08:00:00 GMT+0800 (中国标准时间)

function getDateAgo(date, dayAgo)
{
    date.setDate(date.getDate()-dayAgo); // day ago
    return date;
}
function getSecondsAgo(date, secsAgo)
{
    date.setSeconds(date.getSeconds() - secsAgo);
    return date;
}
lg(getDateAgo(new Date(2015, 0, 2), 365));
lg(getSecondsAgo(new Date(2015, 0, 2), 60));

// Benchmarking
function diffSubstract(date1, date2)
{
    return date2 - date1;
}

function diffGetTime(date1, date2)
{
    return date2.getTime() - date1.getTime();
}

function bench(f){
    let date1 = new Date(0);
    let date2 = new Date();

    let start = Date.now();
    for(let i = 0; i < 100000; i++) f(date1, date2);
    return Date.now() - start;
}
lg('Time of diffSubstract: ' + bench(diffSubstract) + 'ms');
lg('Time of diffGetTime: ' + bench(diffGetTime) + 'ms');

let ms = new Date(Date.parse('2012-01-26T13:51:50.417-07:00'));
lg(ms);

// get weekday
function getWeekDay(date){
    return date.getDay();
}
let date_weekday = new Date(2012, 0 ,3);
lg(date_weekday);
lg(getWeekDay(date_weekday));

// get *last* day of month
function getLastDayofMonth(year, month){
    let date = new Date(year, month, 1);
    lg(date);
    date.setDate(date.getDate() - 1);
    let weekday = getWeekDay(date);
    return {"date" : date, "weekday" : weekday};
}
lg(getLastDayofMonth(2020,4));

// get seconds passed today
function getSecondsToday(){
    
}