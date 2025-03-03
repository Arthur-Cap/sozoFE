import React, { useRef, useState, useEffect } from "react";
import { Camera, StopCircle, RefreshCcw, Upload } from "lucide-react";

const CameraAccess: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunks = useRef<Blob[]>([]);

  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordTime, setRecordTime] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const storedVideo = localStorage.getItem("savedVideo");
    if (storedVideo) {
      setVideoURL(storedVideo);
    }
    return () => stopStream();
  }, []);

  const startCamera = async () => {
    try {
      stopStream();
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
        audio: true,
      });
      setStream(userStream);
      if (videoRef.current) {
        videoRef.current.srcObject = userStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    recordedChunks.current = [];
    setRecordTime(0);
    timerRef.current = setInterval(() => setRecordTime((prev) => prev + 1), 1000);

    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });

    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunks.current.push(event.data);
      }
    };

    recorder.onstop = () => {
      if (timerRef.current) clearInterval(timerRef.current);
      const blob = new Blob(recordedChunks.current, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setVideoURL(url);
      localStorage.setItem("savedVideo", url);
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
    setRecording(false);
  };

  const stopStream = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  const resetRecording = () => {
    setVideoURL(null);
    localStorage.removeItem("savedVideo");
    startCamera();
  };

  return (
    <div className="relative w-full h-screen bg-black">
      {!videoURL ? (
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      ) : (
        <video
          src={videoURL}
          controls
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      )}

      {recording && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black text-white py-1 px-4 rounded-lg text-lg">
          {recordTime}s
        </div>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-6">
        {!videoURL ? (
          recording ? (
            <button
              onClick={stopRecording}
              className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
            >
              <StopCircle className="w-8 h-8 text-white" />
            </button>
          ) : (
            <button
              onClick={startRecording}
              className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
          )
        ) : (
          <>
            <button
              onClick={resetRecording}
              className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
            >
              <RefreshCcw className="w-8 h-8 text-white" />
            </button>
            <button
              onClick={() => console.log("Uploading video...")}
              className="bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
            >
              <Upload className="w-8 h-8 text-white" />
            </button>
          </>
        )}
      </div>

      {!stream && !videoURL && (
        <button
          onClick={startCamera}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 bg-black p-4 rounded-full shadow-lg hover:bg-gray-800 transition"
        >
          <Camera className="w-8 h-8 text-white" />
        </button>
      )}
    </div>
  );
};

export default CameraAccess;