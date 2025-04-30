import axios, { isCancel } from "axios";
import { useEffect, useState } from "react";

export type RoomCredentials = {
  peerToken: string;
  url: string;
};

export default function useRoomCredentials(
  roomName?: string,
  peerName?: string,
) {
  const [state, setState] = useState<RoomCredentials>();

  useEffect(() => {
    if (!roomName || !peerName) return;
    const url = new URL(import.meta.env.VITE_ROOM_MANAGER_URL)!;
    url.searchParams.set("roomName", roomName);
    url.searchParams.set("peerName", peerName);

    const controller = new AbortController();
    let cancel = false;

    axios
      .get<RoomCredentials>(url.toString(), { signal: controller.signal })
      .then((res) => {
        if (!cancel) setState(res.data);
      })
      .catch((e) => {
        if (!isCancel(e)) throw e;
      });
    return () => {
      cancel = true;
      controller.abort();
    };
  }, [peerName, roomName]);

  return state;
}
