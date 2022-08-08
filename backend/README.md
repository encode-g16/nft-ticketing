# Instructions

1. run `npm install`
2. run `npm run dev`

## Mocking

To add more mock data just go to `/src/repositories/events.repository.ts` and add more data.

## API Reference

GET /events

```json
{
  "events": [
    {
      "contractAddress": "0x87D06B58967ca97F283f944907151cA50D3490C0",
      "ownerAddress": "0x51a9aFb7256C7A1BCda78541BE64A96E9B817DF6",
      "name": "GopherCon",
      "date": 1659985437561,
      "imageUrl": "/images/example-contract-address-1.jpeg",
      "location": "London",
      "price": "1000"
    },
    {
      "contractAddress": "0x005607d38a210Eb1bde7A2d51356c3B33046f0F7",
      "ownerAddress": "0xdAe11CeE59C59b2Daa47906BCcAbadDB15404Dd1",
      "name": "AWS Summit",
      "date": 1659985437561,
      "imageUrl": "/images/example-contract-address-2.jpeg",
      "location": "Manchester",
      "price": "2000"
    }
  ]
}
```

GET /events?owner=0xdAe11CeE59C59b2Daa47906BCcAbadDB15404Dd1

```json
{
  "events": [
    {
      "contractAddress": "0x005607d38a210Eb1bde7A2d51356c3B33046f0F7",
      "ownerAddress": "0xdAe11CeE59C59b2Daa47906BCcAbadDB15404Dd1",
      "name": "AWS Summit",
      "date": 1659985437561,
      "imageUrl": "/images/example-contract-address-2.jpeg",
      "location": "Manchester",
      "price": "2000"
    }
  ]
}
```

GET /events/:eventContractAddress (eg: /events/0x87D06B58967ca97F283f944907151cA50D3490C0)

```json
{
  "contractAddress": "0x87D06B58967ca97F283f944907151cA50D3490C0",
  "ownerAddress": "0x51a9aFb7256C7A1BCda78541BE64A96E9B817DF6",
  "name": "GopherCon",
  "date": 1659985437561,
  "imageUrl": "/images/example-contract-address-1.jpeg",
  "location": "London",
  "price": "1000"
}
```

POST /events/:eventContractAddress/image - Content-Type: multipart/form-data

```html
<form action="http://localhost:3000/events/0x87D06B58967ca97F283f944907151cA50D3490C0/image" method="post" enctype="multipart/form-data">
  <p><input type="file" name="image" /></p>
  <p><button type="submit">Submit</button></p>
</form>
```

GET /images/<contractAddress>.jpeg
