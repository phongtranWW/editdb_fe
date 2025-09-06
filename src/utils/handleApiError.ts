import axios from "axios";

export function handleApiError(err: unknown, context?: string) {
  let message = "Unexpected error occurred.";
  if (axios.isAxiosError(err)) {
    const status = err.response?.status;

    switch (status) {
      case 400:
        message = `Bad request: ${err.response?.data.message}`;
        break;
      case 401:
        localStorage.removeItem("access_token");
        message = "You are not logged in.";
        break;
      case 403:
        message = "You don't have permission.";
        break;
      case 404:
        message = `${context || "Resource"} not found.`;
        break;
      case 500:
        message = "Internal server error. Please try again later.";
        break;
      default:
        break;
    }
  }
  return message;
}
