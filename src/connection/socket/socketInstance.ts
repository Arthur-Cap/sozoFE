let socket: WebSocket | null = null;

export const createSocketInstance = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No authToken found in localStorage.");
    return null;
  }

  const url = `ws://14.225.253.196:8081/ws/task?token=${token}`;
  socket = new WebSocket(url);

  return socket;
};

export const getSocketInstance = () => socket;
