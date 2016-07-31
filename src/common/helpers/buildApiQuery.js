// incoming data structure:
// dest=some|startDate=times|pickupTime=you|endDate=win|dropoffTime=man

const buildParams = query =>
  query
  .split('%7C')
  .map(kv => {
    const keyValue = kv.split('=');
    const key = keyValue[0];
    let value = keyValue[1];

    switch (key) {
      case 'startDate':
        value = value.split('-').join('/');
        break;
      case 'endDate':
        value = value.split('-').join('/');
        break;
      default:
        value = keyValue[1];
    }
    return `&${key}=${value}`;
  })
  .join('')
  .toLowerCase();

export default buildParams;
