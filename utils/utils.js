'use strict';

export const checkStatus = (response) => {
  if (!response.ok) {   // (response.status < 200 || response.status > 300)
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
};

export const parseJSON = (response) => {
  return response.json();
};

export const sortByValueSmallest = (a, b) => {
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // a must be equal to b
  return 0;
};

export const sortByValueLargest = (a, b) => {
  return b-a
};

export const sortByName = (a, b) => {
  var nameA = a.toUpperCase(); // ignore upper and lowercase
  var nameB = b.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
};

export const formatDate = (date) => {
  let dd = date.getDate();
  let mm = date.getMonth()+1; //January is 0!
  let yyyy = date.getFullYear();

  if(dd<10) {
    dd='0'+dd
  }

  if(mm<10) {
    mm='0'+mm
  }

  return yyyy+'-'+mm+'-'+dd;
};

export const decreaseAndformatDateFromToday = (numberOfDaysToRemove) => {
  let date = new Date;
  let day = date.getDate();
  date.setDate(day - numberOfDaysToRemove);
  return formatDate(date);
};

export const pluralize = (value) => {
  return parseInt(value) > 1 ? 's' : '';
};

export const timeDaysMap = (value) => {
  let pluralized = pluralize(value);

  return [
    {value: `minute`, label: `minute${pluralized}`},
    {value: `hour`, label: `hour${pluralized}`},
    {value: `day`, label: `day${pluralized}`}
  ]
};

export const hoursOptionsMap = () => {
  let hours = [];
  for (let i = 0; i < 24; i++) {
    let hour = i < 10 ? `0${i}` : i.toString();
    hours.push({label: hour, value: hour})
  }
  return hours;
};

export const minutesOptionsMap = () => {
  let minutes = [];

  for (let i = 0; i < 61; i += 5) {
    let min = i < 10 ? `0${i}` : i.toString();
    minutes.push({label: min, value: min})
  }
  return minutes;
};

export const timeFormatMH = (time) => {
  return time < 10 ? `0${time}:00` : time.toString() + ':00';
};

export const mapAudienceTargetingValues = (audience) => {
  return audience && audience.map((item) => {

    let obj = {
      value: item.key,
      label: item.name
    };

    item.type ? obj.type = item.type.toLowerCase() : null;

    return obj;
  })
};

export const getPercentage = (val1, val2) => {
  if (!val2) return -1;

  return Math.round(val1 / val2 * 100);
};

export const getPercentageString = (val1, val2) => {
  const percentage = getPercentage(val1, val2);

  if (percentage === -1) return '-';

  return percentage + '%';
};