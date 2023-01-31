# songduo

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

in order to use firestore emulator (and not create bad data in prod firestore), first run:

```
npm run dev
```

this will spin up a local firestore emulator database, then run:

```
npm run serve
```

which will serve the client at localhost:3000

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy

First, build application locally (compile and minify)

```
npm run build
```

Then, push to firebase

```
firebase deploy
```
