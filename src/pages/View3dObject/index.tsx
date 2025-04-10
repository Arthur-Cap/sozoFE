import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { useTaskById } from "../../hooks/useTaskGenerate";

const View3dObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();
  const { data: task, isLoading, isError } = useTaskById(id);

  useEffect(() => {
    if (!containerRef.current || !task?.resultLink) return;

    // Xóa nội dung cũ nếu có
    containerRef.current.innerHTML = "";

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Tạo scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setClearColor(0x808080); // màu nền xám
    containerRef.current.appendChild(renderer.domElement);

    // Hiển thị tiến độ load
    const progressContainer = document.createElement("div");
    progressContainer.style.position = "absolute";
    progressContainer.style.top = "50%";
    progressContainer.style.left = "50%";
    progressContainer.style.transform = "translate(-50%, -50%)";
    progressContainer.style.display = "flex";
    progressContainer.style.alignItems = "center";
    progressContainer.style.justifyContent = "center";
    progressContainer.style.width = "100px";
    progressContainer.style.height = "100px";
    progressContainer.style.border = "5px solid #ccc";
    progressContainer.style.borderRadius = "50%";
    progressContainer.style.fontSize = "20px";
    progressContainer.style.backgroundColor = "#fff";
    containerRef.current.appendChild(progressContainer);

    // Ánh sáng
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // Điều khiển chuột
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // Load OBJ
    const objLoader = new OBJLoader();
    objLoader.load(
      task.resultLink,
      (object) => {
        object.position.set(0, -1, 0);
        object.scale.set(1, 1, 1);
        scene.add(object);
        if (containerRef.current && progressContainer.parentElement) {
          containerRef.current.removeChild(progressContainer);
        }
      },
      (xhr) => {
        if (xhr.total) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          progressContainer.innerText = `${percent}%`;
        }
      },
      (error) => {
        console.error("Error loading model", error);
        if (containerRef.current && progressContainer.parentElement) {
          containerRef.current.removeChild(progressContainer);
        }
      }
    );

    camera.position.set(0, 1, 5);

    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener("resize", handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [task]);

  if (isLoading) {
    return <p className="text-center mt-10">Đang tải mô hình 3D...</p>;
  }

  if (isError || !task?.resultLink) {
    return (
      <p className="text-center mt-10 text-red-500">
        Không thể tải mô hình. Vui lòng thử lại sau.
      </p>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
      }}
    />
  );
};

export default View3dObject;
