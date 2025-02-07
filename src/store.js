import { create } from "zustand";

const useStore = create((set) => ({
  baseURL: "https://185a-47-147-135-27.ngrok-free.app",
}));

export default useStore;
