# Gesture Recognition Example

The code in this repository contains a full working example of a videoconferencing app with gesture recognition.

## Running

To run the example locally, first install the dependencies by running

```
yarn
```

Next, copy [`.env.example`](.env.example) to `.env` and then update the value of `VITE_ROOM_MANAGER_URL` in `.env`.

> [!tip]
> You can get a working `VITE_ROOM_MANAGER_URL` on [Fishjam](https://fishjam.io/app) or by running [room-manager](https://github.com/fishjam-cloud/js-server-sdk/tree/main/examples/room-manager) locally.

Finally, run the example with

```sh
yarn dev
```
