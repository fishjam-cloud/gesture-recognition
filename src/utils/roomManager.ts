import axios from "axios";

type RoomManagerResponse = {
  peerToken: string;
  url: string;
};

export const getRoomCredentials = async (
  roomName: string,
  peerName: string,
) => {
  const url = new URL(import.meta.env.VITE_ROOM_MANAGER_URL)!;
  url.searchParams.set("roomName", roomName);
  url.searchParams.set("peerName", peerName);

  const res = await axios.get<RoomManagerResponse>(url.toString());
  return res.data;
};
