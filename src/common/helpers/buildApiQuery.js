// incoming data structure:
// dest=some|startDate=times|pickupTime=you|endDate=win|dropoffTime=man
import moment from 'moment';

const buildParams = query =>
  query
  .split('_')
  .map(kv => {
    const keyValue = kv.split('=');
    const key = keyValue[0];
    let value = keyValue[1];

    switch (key) {
      case 'startDate': {
        const parts = value.split('-');
        value = moment({
          year: parts[0],
          month: parts[1] - 1,
          day: parts[2],
        }).format('MM/DD/YYYY');
        break;
      }
      case 'endDate': {
        const parts = value.split('-');
        value = moment({
          year: parts[0],
          month: parts[1] - 1,
          day: parts[2],
        }).format('MM/DD/YYYY');
        break;
      }
      default:
        value = keyValue[1];
    }
    return `&${key}=${value}`;
  })
  .join('')
  .toLowerCase();

export default buildParams;
