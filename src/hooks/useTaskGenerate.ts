import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface TaskGenerateResponse {
  id: string;
  status: string;
  // Add other fields based on your backend response
}

interface ErrorResponse {
  message: string;
}

const generateTask = async (file: Blob): Promise<TaskGenerateResponse> => {
  const formData = new FormData();
  formData.append("zipFile", file, "frames.zip");

  const response = await axiosInstance.post("/task/generate/3D", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const useTaskGenerate = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: generateTask,
    onSuccess: (data) => {
      alert("Upload successful!");
      navigate("/");
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      console.error(error);
      alert(
        error.response?.data?.message || "Upload failed! Please try again."
      );
    },
  });
};
