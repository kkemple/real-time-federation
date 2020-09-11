import { useCallback, useEffect, useRef } from "react";
import io from "socket.io-client";

export default function useSocket(url) {
  const { current: socket } = useRef(
    io(url, { transports: ["websocket", "polling"] })
  );

  useEffect(() => {
    return () => {
      socket && socket.removeAllListeners();
      socket && socket.close();
    };
  }, [socket]);

  const subscribeToEvent = useCallback(
    (event, cb) => {
      if (!socket) {
        return true;
      }

      socket.on(event, data => {
        return cb(null, data);
      });
    },
    [socket]
  );

  return { socket, subscribeToEvent };
}
