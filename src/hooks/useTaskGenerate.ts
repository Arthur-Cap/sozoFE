import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

interface TaskGenerateResponse {
  id: string;
  status: string;
}

interface Task {
  taskId: number;
  taskName: string | null;
  taskStatus: string;
  processTime: number;
  displayImg: string | null;
}

interface TaskListResponse {
  content: Task[];
}

interface ErrorResponse {
  message: string;
}

const generateTask = async (
  formData: FormData
): Promise<TaskGenerateResponse> => {
  const response = await axiosInstance.post("/task/generate/3D", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const fetchTasks = async (
  page: number,
  limit: number
): Promise<Task[]> => {
  const response = await axiosInstance.get<TaskListResponse>("/task/generate/3D", {
    params: {
      page,
      limit,
    },
  });
  console.log(response.data)
  return response.data.content;
};

export const useTasks = (page: number, limit: number) => {
  return useQuery<Task[], AxiosError>({
    queryKey: ["tasks", page, limit],
    queryFn: () => fetchTasks(page, limit),
  });
};

export const useTaskGenerate = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return useMutation<TaskGenerateResponse, AxiosError<ErrorResponse>, FormData>({
    mutationFn: generateTask,
    onSuccess: () => {
      alert("Upload successful!");
      navigate("/");
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (error) => {
      alert(
        error.response?.data?.message || "Upload failed! Please try again."
      );
    },
  });
};
