# Start

```
docker-compose build
docker-compose up -d
```

# Endpoints

## Scraping

`POST localhost:3001/getAllSales `

no body

gets all 20k sales, takes a minute or two

`POST localhost:3001/getSales`

```
{
    "pageMax": 1000,
    "pageMin": 0
}
```

gets sales between 0 and 1000

## Features

`GET localhost:3000/top10MostBought`

`GET localhost:3000/top10MostProfitable`

`GET localhost:3000/top10MostBoughtYesterday`
