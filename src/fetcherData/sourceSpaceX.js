import prepearingCardData from './fetcherData';

const generateUrlQuery = (url, num) => `${url}/${num}/`;

const configSource1 = {
  url: 'https://api.spacexdata.com/v3/history',
  generateUrlQuery,
  genData: (data) => [
    {
      type: 'text',
      fieldName: 'id',
      value: data.id
    },
    {
      type: 'text',
      fieldName: 'Flight number',
      value: data.flight_number
    },
    {
      type: 'date',
      fieldName: 'Event date',
      value: data.event_date_utc
    },
    {
      type: 'bigText',
      fieldName: 'Details',
      value: data.details
    },
    {
      type: 'link',
      fieldName: 'Article',
      value: data.links.article
    },
    {
      type: 'link',
      fieldName: 'Wiki',
      value: data.links.wikipedia
    }
  ]
};

export default prepearingCardData('SpaceX', 'SpaceX historical events', [configSource1]);
