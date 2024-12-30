interface ServerToClientEvents {
  noArg: () => void;
  businessUpdated: (data: { businessId: string; message: string }) => void;
  businessDeleted: (data: { businessId: string; message: string }) => void;
}

interface ClientToServerEvents {
  subscribe: (businessId: string) => void;
  unsubscribeAll: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  userId: string;
}

export {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
};
