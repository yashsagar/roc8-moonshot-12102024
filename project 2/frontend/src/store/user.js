import { create } from "zustand";
import toast from "react-hot-toast";

export const useUser = create((set) => ({
  user: null,
  authCheck: async () => {
    try {
      fetch("http://localhost:3000/v1/auth/authCheck", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.user) set({ user: data.user });
        });
    } catch (error) {
      set({ user: null });

      toast.error(error.message || "An error occurred");
    }
  },
  logout: async () => {
    try {
      fetch("http://localhost:3000/v1/auth/logout", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(() => {
          set({ user: null });
          toast.success("Logged out successfully");
        });
    } catch (error) {
      toast.error(error.response.data.message || "Logout failed");
    }
  },

  login: async ({ uri, credentials }) => {
    set({ isLoggingIn: true });
    try {
      fetch(uri, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            toast.error(data.message);
          } else {
            set({ user: data.user });
            toast.success(data.message);
          }
        })
        .catch((error) => {
          console.log("server connection error", error);
        });
    } catch (error) {
      console.log("client side internal error", error);
    }
  },
}));
