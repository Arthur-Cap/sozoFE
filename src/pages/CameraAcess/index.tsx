import React, { useState, useEffect, useRef } from "react";
import { Camera, StopCircle, RefreshCcw, Upload, Send } from "lucide-react";
import { useReactMediaRecorder } from "react-media-recorder";
import JSZip from "jszip";
import { useTaskGenerate } from "../../hooks/useTaskGenerate";
import TextInputPopup from "../../components/TextInputPopup";
import { useTopBar } from "../../contexts/TopBarContext";

enum ProgressState {
  EXTRACTING_FRAMES = "Trích xuất ảnh",
  PREPARING_DATA = "Xử lý dữ liệu",
}

const CameraAccess: React.FC = () => {
  const [recordTime, setRecordTime] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [progress, setProgress] = useState(0);
  const [progressName, setProgressName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showNameModal, setShowNameModal] = useState(false);
  const [recordedDuration, setRecordedDuration] = useState(0);
  const [isRecorded, setIsRecorded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { startRecording, stopRecording, mediaBlobUrl, status } =
    useReactMediaRecorder({
      video: true,
      audio: true,
    });
  const taskGenerateMutation = useTaskGenerate();
  const { setTopBarState } = useTopBar();
  useEffect(() => {
    localStorage.removeItem("savedVideo");
    const initCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error(error);
      }
    };
    initCamera();
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, [videoURL]);

  useEffect(() => {
    if (recordTime != 0) {
      setTopBarState({
        backgroundImage:
         "",
        backgroundColor: "#0060dc",
        title: `${recordTime}s`,
      });
    }
  }, [recordTime]);

  useEffect(() => {
    if (status === "recording") {
      setRecordTime(0);
      setTopBarState({
        backgroundImage:
         "",
        backgroundColor: "#0060dc",
        title: "0s",
      });

      setIsRecorded(true);
      const interval = window.setInterval(() => {
        setRecordTime((prev) => prev + 1);
      }, 1000);
      setTimer(interval);
    } else if (status === "stopped") {
      if (timer) {
        clearInterval(timer);
        setTimer(null);
      }
      if (isRecorded) {
        setRecordedDuration(recordTime);
        setTopBarState({
          backgroundImage:
           "",
          backgroundColor: "#0060dc",
          title: "Record ended",
        });
      }
      if (mediaBlobUrl) {
        setVideoURL(mediaBlobUrl);
        localStorage.setItem("savedVideo", mediaBlobUrl);
      }
    }
  }, [status, mediaBlobUrl]);

  const handleStartRecording = async () => {
    if (!stream) {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error(error);
        return;
      }
    }
    startRecording();
  };

  const resetRecording = () => {
    setVideoURL(null);
    localStorage.removeItem("savedVideo");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setIsRecorded(false);
      const url = URL.createObjectURL(file);
      setVideoURL(url);
      localStorage.setItem("savedVideo", url);
      if (videoRef.current) {
        videoRef.current.src = url;
      }
    }
  };

  const extractFrames = async (videoUrl: string, fallbackDuration: number) => {
    if (isRecorded) {
      return new Promise<HTMLCanvasElement[]>((resolve) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const frames: HTMLCanvasElement[] = [];
        video.addEventListener("loadedmetadata", () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          video.play();
          const intervalTime =
            recordedDuration > 0 ? (recordedDuration * 1000) / 60 : 200;
          const captureInterval = setInterval(() => {
            if (frames.length >= 60 || video.ended) {
              clearInterval(captureInterval);
              resolve(frames);
            } else {
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = document.createElement("canvas");
                frame.width = canvas.width;
                frame.height = canvas.height;
                const fctx = frame.getContext("2d");
                if (fctx) fctx.drawImage(canvas, 0, 0);
                frames.push(frame);
                setProgress(Math.round((frames.length / 60) * 100));
                setProgressName(ProgressState.EXTRACTING_FRAMES);
              }
            }
          }, intervalTime);
        });
        video.play();
      });
    } else {
      return new Promise<HTMLCanvasElement[]>((resolve) => {
        const video = document.createElement("video");
        video.src = videoUrl;
        video.crossOrigin = "anonymous";
        video.muted = true;
        video.playsInline = true;
        video.currentTime = 0;
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const frames: HTMLCanvasElement[] = [];
        const startCapture = () => {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          video.currentTime = 0;
          const captureFrame = () => {
            if (frames.length < 60) {
              if (ctx) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const frame = document.createElement("canvas");
                frame.width = canvas.width;
                frame.height = canvas.height;
                const fctx = frame.getContext("2d");
                if (fctx) fctx.drawImage(canvas, 0, 0);
                frames.push(frame);
                setProgress(Math.round((frames.length / 60) * 100));
                setProgressName(ProgressState.EXTRACTING_FRAMES);
                let duration = video.duration;
                if (!Number.isFinite(duration) || duration <= 0) {
                  duration = fallbackDuration;
                }
                const step = duration / 60;
                if (Number.isFinite(step) && step > 0) {
                  video.currentTime += step;
                } else {
                  resolve(frames);
                }
              }
            } else {
              resolve(frames);
            }
          };
          video.addEventListener("seeked", () => {
            setTimeout(captureFrame, 100);
          });
          captureFrame();
        };
        video.addEventListener("loadedmetadata", () => {
          if (!Number.isFinite(video.duration) || video.duration <= 0) {
            const handleDurationChange = () => {
              if (Number.isFinite(video.duration) && video.duration > 0) {
                video.removeEventListener(
                  "durationchange",
                  handleDurationChange
                );
                startCapture();
              }
            };
            video.addEventListener("durationchange", handleDurationChange);
          } else {
            startCapture();
          }
        });
        video.play();
      });
    }
  };

  const handleUpload = async () => {
    if (!videoURL) return;
    setShowNameModal(true);
  };

  const handleNameConfirm = async (taskName: string) => {
    if (!videoURL) return;
    setShowNameModal(false);
    setIsLoading(true);
    setProgress(0);
    try {
      const frames = await extractFrames(videoURL, recordedDuration);
      const zip = new JSZip();
      const middleFrameIndex = Math.floor(frames.length / 2);
      const displayFrame = frames[middleFrameIndex];
      const displayBlob = await new Promise<Blob>((resolve) =>
        displayFrame.toBlob((b) => resolve(b as Blob), "image/jpeg")
      );
      for (let i = 0; i < frames.length; i++) {
        const blob = await new Promise<Blob>((resolve) =>
          frames[i].toBlob((b) => resolve(b as Blob), "image/jpeg")
        );
        zip.file(`frame_${i + 1}.jpg`, blob);
      }
      setProgressName(ProgressState.PREPARING_DATA);
      const zipBlob = await zip.generateAsync({ type: "blob" }, (metadata) =>
        setProgress(Math.round(metadata.percent))
      );
      /*
      // === DOWNLOAD ZIP TO LOCAL (remove later) ===
      const zipUrl = URL.createObjectURL(zipBlob);
      const a = document.createElement("a");
      a.href = zipUrl;
      a.download = "frames.zip";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(zipUrl);
      // === END DOWNLOAD ZIP TO LOCAL ===
      */
      const formData = new FormData();
      formData.append("zipFile", zipBlob, "frames.zip");
      formData.append("displayImg", displayBlob, "display.jpg");
      formData.append("taskName", taskName);
      taskGenerateMutation.mutate(formData);
    } catch (error) {
      console.error(error);
      alert("Failed to prepare file! Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {videoURL ? (
        <div>
          <video
            src={videoURL}
            autoPlay
            muted
            loop
            playsInline
            controls
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {isLoading && (
        <div className="absolute top-4 right-4 bg-black text-white py-1 px-4 rounded-lg text-lg">
          {progressName} {progress}%
        </div>
      )}
      {videoURL && !isLoading && (
        <button
          onClick={handleUpload}
          className="absolute top-4 right-4 bg-blue-500 p-3 rounded-full shadow-lg hover:bg-blue-700 transition"
        >
          <Send className="w-6 h-6 text-white" />
        </button>
      )}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
        {!videoURL ? (
          <>
            {status === "recording" ? (
              <button onClick={stopRecording}>
                <StopCircle className="w-8 h-8 text-white" />
              </button>
            ) : (
              <>
                <button onClick={handleStartRecording}>
                  <Camera className="w-8 h-8 text-white" />
                </button>
                <button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="w-8 h-8 text-white" />
                </button>
                <input
                  type="file"
                  accept="video/*"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  hidden
                />
              </>
            )}
          </>
        ) : (
          <button onClick={resetRecording}>
            <RefreshCcw className="w-8 h-8 text-white" />
          </button>
        )}
      </div>
      <TextInputPopup
        isOpen={showNameModal}
        onClose={() => setShowNameModal(false)}
        onConfirm={handleNameConfirm}
        title="Nhập tên gợi nhớ"
        placeholder="Nhập tên gợi nhớ..."
      />
    </div>
  );
};

export default CameraAccess;
