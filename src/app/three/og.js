"use client";
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import ThunderBackground from './thunder';
import Sparks from './sparks';
import Clouds from './clouds';
import Wave from './wave';
import Cloud2 from './cloud';


const backgrounds = [
  <ThunderBackground key="thunder" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />,
  <Sparks key="sparks" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />,
  <Clouds key="clouds" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />,
  <Wave key="wave" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />,
  <Cloud2 key="cloud" style={{ position: 'absolute', top: 0, left: 0, zIndex: 1 }} />,
];

const ThreeScene = () => {
  const containerRef = useRef(null);
  const mountRef = useRef(null);
  const randomIndex = Math.floor(Math.random() * backgrounds.length);
  const randomBackground = backgrounds[randomIndex];

  useEffect(() => {
    if (!containerRef.current) return;

    const loadScene = async () => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight, 0.1, 1000);
      camera.position.set(0, 0, 5);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.autoRotate = true;

      const ambientLight = new THREE.AmbientLight(0xffffff, 5);
      scene.add(ambientLight);

      const directionalLight1 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight1.position.set(1, 1, 1);
      scene.add(directionalLight1);

      const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight2.position.set(1, -2, 1);
      scene.add(directionalLight2);

      new RGBELoader().load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/ambient.hdr', function (texture) {
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        const envMap = pmremGenerator.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGenerator.dispose();
      });

      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('https://www.gstatic.com/draco/v1/decoders/');

      const loader = new GLTFLoader();
      loader.setDRACOLoader(dracoLoader);
      loader.load('https://raw.githubusercontent.com/sunshinevendetta/Vibesocialclub/main/images/final.glb', function (gltf) {
        const model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.sub(center);
        scene.add(model);
      }, undefined, function (error) {
        console.error('An error happened:', error);
      });

      const onResize = () => {
  if (containerRef.current) {
    const { clientWidth, clientHeight } = containerRef.current;
    camera.aspect = clientWidth / clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(clientWidth, clientHeight);
  }
};

      const observer = new ResizeObserver(onResize);
      observer.observe(containerRef.current);

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();

      return () => {
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement);
        }
        observer.disconnect();
      };
    };

    loadScene();
  }, []);

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden' }}>
      {randomBackground}
      <div ref={mountRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }}></div>
    </div>
  );
};

export default ThreeScene;