import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

interface LoginPayload {
  userName: string; // Changed from email to userName
  password: string;
}

interface LoginResponse {
  token: string;
  expiresIn: number; // Added to match backend response
}

const loginUser = async (payload: LoginPayload): Promise<LoginResponse> => {
  const response = await axiosInstance.post("/auth/login", payload);
  return response.data;
};

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("tokenExpiresIn", data.expiresIn.toString());
      alert("Login successful!");
      navigate("/");
    },
    onError: (error) => {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    },
  });
};
