import { Event } from '@interfaces/events.interface';

const eventsRepo: Event[] = [
  {
    contractAddress: '0x87D06B58967ca97F283f944907151cA50D3490C0',
    ownerAddress: '0x51a9aFb7256C7A1BCda78541BE64A96E9B817DF6',
    name: 'GopherCon',
    date: Date.now(),
    imageUrl: '/images/0x87D06B58967ca97F283f944907151cA50D3490C0.jpeg',
    location: 'London',
    price: '1000',
  },
  {
    contractAddress: '0x005607d38a210Eb1bde7A2d51356c3B33046f0F7',
    ownerAddress: '0xdAe11CeE59C59b2Daa47906BCcAbadDB15404Dd1',
    name: 'AWS Summit',
    date: Date.now(),
    imageUrl: '/images/0x005607d38a210Eb1bde7A2d51356c3B33046f0F7.jpeg',
    location: 'Manchester',
    price: '2000',
  },
];

export default eventsRepo;
