IFSC data in CSV is huge (~150k records), so splitting this into multiple CSV files makes `gatsby-transform-csv` work better.

Once you've cloned the repo and done `npm install`, follow this for dev & build:

## develop

```sh
npm run split:develop
npm run develop
```

## build

```sh
npm run split:build
npm run build
```
