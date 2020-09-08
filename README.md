# forflyaway

> My sweet Nuxt.js project

## Build Setup

``` bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Production deployment

```
$ cd /var/www/html/ffa-web
$ git pull
$ NODE_ENV=production npm install
$ NODE_ENV=production npm run-script build
$ pm2 restart 0
```


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
