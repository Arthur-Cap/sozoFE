let socket: WebSocket | null = null;

export const createSocketInstance = () => {
  const token = localStorage.getItem("authToken");
  if (!token) {
    console.error("No authToken found in localStorage.");
    return null;
  }

  const url = `ws://sozo3d.pro.vn/ws/task?token=${token}`;
  // const url = `ws://localhost:8081/ws/task?token=${token}`;
  socket = new WebSocket(url);

  return socket;
};

export const getSocketInstance = () => socket;
