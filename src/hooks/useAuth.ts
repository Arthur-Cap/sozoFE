import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../connection/api/axiosInstance";

interface LoginPayload {
  userName: string;
  password: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number;
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginPayload>({
    mutationFn: loginUser,
  });
};
