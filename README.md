[![Ad](https://swm-delivery.com/www/images/zone-gh-fishjam-1?n=1)](https://swm-delivery.com/www/delivery/ck.php?zoneid=zone-gh-fishjam-1&n=1)
[![Ad](https://swm-delivery.com/www/images/zone-gh-fishjam-2?n=1)](https://swm-delivery.com/www/delivery/ck.php?zoneid=zone-gh-fishjam-2&n=1)
[![Ad](https://swm-delivery.com/www/images/zone-gh-fishjam-3?n=1)](https://swm-delivery.com/www/delivery/ck.php?zoneid=zone-gh-fishjam-3&n=1)

# Gesture Recognition Example

The code in this repository contains a full working example of a videoconferencing app with gesture recognition.

## Running

To run the example locally, first install the dependencies by running

```
yarn
```

Next, copy [`.env.example`](.env.example) to `.env` and then set both values in `.env`:

- `VITE_FISHJAM_ID`: the Fishjam ID used for the connection.
- `VITE_ROOM_MANAGER_URL`: the full room-manager URL used to obtain peer tokens.

> [!tip]
> You can get a working `VITE_ROOM_MANAGER_URL` on [Fishjam](https://fishjam.io/app) or by running [room-manager](https://github.com/fishjam-cloud/js-server-sdk/tree/main/examples/room-manager) locally.

Finally, run the example with

```sh
yarn dev
```

## Deployment

The deployment workflow reads `FISHJAM_ID` and `ROOM_MANAGER_URL` from GitHub Actions variables available to the `deploy` environment. Set `ROOM_MANAGER_URL` to the full room-manager URL; it is independent of `FISHJAM_ID`. Both values are embedded in the static bundle during the build, so changing them requires redeployment.
