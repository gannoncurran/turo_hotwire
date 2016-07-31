// TODO: build a single string from a query object, extract to a module

const buildParams = query => Object.keys(query).map(key => `${key}=${query[key]}`).join('|');
  // return paramList.join('|');
  // `dest=${dest}|startdate=${startdate}|pickuptime=${pickuptime}|enddate=${enddate}|dropofftime=${dropofftime}|`;

export default buildParams;
