import { EventifyEvent } from '../interfaces/event.interface';

export const createEvent = (
  data: Partial<EventifyEvent> = {}
): EventifyEvent => ({
  _id: '5f5f5f5f5f5f5f5f5f5f5f5f',
  title: 'My Awesome Event',
  flyerFront: 'https://example.com/my-awesome-event-flyer.jpg',
  attending: 42,
  date: '2022-01-01T00:00:00.000',
  startTime: '2022-01-01T18:00:00.000',
  endTime: '2022-01-02T04:00:00.000',
  contentUrl: '/events/123456',
  venue: {
    id: '789',
    name: 'My Awesome Venue',
    contentUrl: '/venues/789',
    live: true,
    direction: 'https://www.google.com/maps/dir//My+Awesome+Venue',
  },
  pick: {
    id: '987',
    blurb: 'This is the best event ever!',
  },
  artists: [
    {
      id: '123',
      name: 'My Awesome Artist',
      _id: {
        $oid: '625c40e396c7a90c87f21d10',
      },
    },
  ],
  city: 'My Awesome City',
  country: 'My Awesome Country',
  private: false,
  __v: 0,
  ...data,
});
