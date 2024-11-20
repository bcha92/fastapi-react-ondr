export const getInitState = {
  status: "idle",
  error: undefined,
  data: undefined,
};

export const getReducer = (state, action) => {
  switch (action.type) {
    case "loading":
      return { status: action.type, error: undefined, data: undefined };
    case "done":
      return { status: action.type, error: undefined, data: action.data };
    case "error":
      return { status: action.type, error: action.error, data: action.data };
    default: // Idle
      return state;
  }
};
