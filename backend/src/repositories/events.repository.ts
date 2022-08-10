import { Event } from '@interfaces/events.interface';

const eventsRepo: Event[] = [
  {
    contractAddress: '0x87D06B58967ca97F283f944907151cA50D3490C0',
    ownerAddress: '0x51a9aFb7256C7A1BCda78541BE64A96E9B817DF6',
    name: 'GopherCon',
    date: new Date(Date.now()).toDateString(),
    imageUrl: '/images/0x87D06B58967ca97F283f944907151cA50D3490C0.webp',
    location: 'London',
    price: '0.1',
  },
  {
    contractAddress: '0x005607d38a210Eb1bde7A2d51356c3B33046f0F7',
    ownerAddress: '0xdAe11CeE59C59b2Daa47906BCcAbadDB15404Dd1',
    name: 'AWS Summit',
    date: new Date(Date.now()).toDateString(),
    imageUrl: '/images/0x005607d38a210Eb1bde7A2d51356c3B33046f0F7.png',
    location: 'Manchester',
    price: '0.2',
  },
  {
    contractAddress: '0x005607d38a210Eb1bde7A2d51356c3B33046f0F8',
    ownerAddress: '0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    name: '2022 Summer Beach Party',
    date: 'Fri, Aug 16, 11.59pm',
    imageUrl: '/images/0x005607d38a210Eb1bde7A2d51356c3B33046f0F8.jpg',
    location: 'Club La Federico, Barcelona',
    price: '0.01',
  },
  {
    contractAddress: '0x1',
    name:'Blockchain Entrepeneurs Networking Event',
    date:'Thu, Sep 23, 17.00',
    location:'Barbican Center, London',
    price: '',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x1.jpg'
},
{   
    contractAddress:'0x2',
    name:'E-commerce with Shopify',
    date:'Wed, Aug 31, 19.00',
    location:'Vox Studios, London',
    price: '0.02',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x2.jpg'
},
{   
    contractAddress:'0x3',
    name:'Open Coffee Startup Networking',
    date:'Tue, Aug 23, 19.00',
    location:'Aticco Med, Barcelona',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    price: '0.02',
    imageUrl:'/images/0x3.jpg'
},
{ 

    contractAddress:'0x4',
    name:'Barcelona Tech Job Fair',
    date:'Thu, Nov 3, Full Day',
    location:'Ilunion Hotel Barcelona',
    price: '0.02',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x4.jpg'
},
{   
    contractAddress:'0x5',
    name:'Movies in the Park',
    date:'Tue, Sep 28, 17.00',
    location:'Regents Park, London',
    price: '0.02',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x5.jpg'
},  
{
    contractAddress:'0x6',
    name:'ETH Bogota',
    date:'Fri, Oct 7-9, Full Day',
    location: 'Bogota',
    price: '0.02',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x6.jpg'
},
{
    contractAddress:'0x7',
    name:'ETH India',
    date:'Fri, Dec 2-4, Full Day',
    location:'Bengaluru',
    price: '0.02',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl: '/images/0x7.jpg'
},
{
    contractAddress:'0x8',
    name:'FutureTravel Summit 2022',
    date:'Fri, Nov 4, 13.30',
    price: '',
    location:'Hyatt Regency Barcelona Tower',
    ownerAddress:'0x4764e0eb62e55a2e8cb1d593588d2fc52cc0e89b',
    imageUrl:'/images/0x8.jpg'
}
];

export default eventsRepo;
