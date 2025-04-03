import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const OBJ_URL = '/assets/quadiacau.obj';

const View3dObject: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (!containerRef.current) return;

    // Xóa nội dung cũ (nếu có)
    containerRef.current.innerHTML = '';

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // Khởi tạo scene, camera, renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    // Đặt nền thành màu xám (gray)
    renderer.setClearColor(0x808080);
    containerRef.current.appendChild(renderer.domElement);

    // Tạo element vòng tròn hiển thị tiến độ
    const progressContainer = document.createElement('div');
    progressContainer.style.position = 'absolute';
    progressContainer.style.top = '50%';
    progressContainer.style.left = '50%';
    progressContainer.style.transform = 'translate(-50%, -50%)';
    progressContainer.style.display = 'flex';
    progressContainer.style.alignItems = 'center';
    progressContainer.style.justifyContent = 'center';
    progressContainer.style.width = '100px';
    progressContainer.style.height = '100px';
    progressContainer.style.border = '5px solid #ccc';
    progressContainer.style.borderRadius = '50%';
    progressContainer.style.fontSize = '20px';
    progressContainer.style.backgroundColor = '#fff';
    containerRef.current.appendChild(progressContainer);

    // Ánh sáng cơ bản
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5).normalize();
    scene.add(directionalLight);

    // Thêm điều khiển xoay bằng chuột
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 100;

    // Load file OBJ với callback tiến trình
    const objLoader = new OBJLoader();
    objLoader.load(
      OBJ_URL,
      (object) => {
        object.position.set(0, -1, 0);
        object.scale.set(1, 1, 1);
        scene.add(object);
        // Xóa vòng tròn tiến trình sau khi tải xong
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
        console.error('Error loading model', error);
        // Xóa vòng tròn tiến trình nếu có lỗi
        if (containerRef.current && progressContainer.parentElement) {
          containerRef.current.removeChild(progressContainer);
        }
      }
    );

    // Đặt vị trí cho camera
    camera.position.set(0, 1, 5);

    // Xử lý thay đổi kích thước màn hình
    const handleResize = () => {
      if (containerRef.current) {
        const newWidth = containerRef.current.clientWidth;
        const newHeight = containerRef.current.clientHeight;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Animation để render liên tục
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup khi thoát khỏi component
    return () => {
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [id]);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
      }}
    />
  );
};

export default View3dObject;
