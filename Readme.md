# Gearbox Automatic App

Mobile App for the [Gearbox Automatic Turntable](https://kickstarter.com/projects/1865098753/the-gearbox-automatic-an-autostreaming-hifi-turnta).

This is a React Web App wrapped up with Cordova.

The [Gearbox Automatic Server](https://github.com/clocklimited/GearboxAutomaticServer) is also needed for development.

The [Style Guide](https://github.com/clocklimited/GearboxStyleGuide) is currently in a separate project.

## Setup

Install dependencies

```
yarn install
```

## Run

### React Development in Browser

```
yarn dev
```

### Cordova Development

This only needs to be done on first run of the native project

```
yarn dev:native:setup
```

The to run choose the platform:

```
yarn dev:native:browser
```

or

```
yarn dev:native:ios
```

## Production Build (For Cordova)

```
yarn build
```



When working in the browser ignore the `GET http://localhost:8080/cordova.js 404 (Not Found)` error.

## Testing

All tests can be run continually during development:

```
yarn dev:test
```

Or just one for CI etc.

```
yarn test
```

## License
Licensed under the [Clock License](https://github.com/clocklimited/ClockLicense)
