"use client";
import React, { useRef } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const ShaderMaterial = () => {
  const materialRef = useRef();
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    materialRef.current.uniforms.iTime.value = clock.getElapsedTime();
    materialRef.current.uniforms.iMouse.value = new THREE.Vector4(mouse.x, mouse.y, 0, 0);
  });

  const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv; // Pass UV coordinates to the fragment shader
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); // Calculate the position of the vertex
  }
`;

const fragmentShader = `
  uniform vec3 iResolution; // The dimensions of the viewport
  uniform float iTime; // Shader uniform for time
  uniform vec4 iMouse; // Mouse position x, y values
  varying vec2 vUv; // Received UV coordinates from the vertex shader

  // Generates a pseudo-random value based on 2D input
  float hash21(vec2 x) {
    return fract(cos(mod(dot(x, vec2(13.9898, 8.141)), 3.14)) * 43758.5453);
  }

  // Generates a 2D pseudo-random value based on 2D input
  vec2 hash22(vec2 uv) {
    uv = vec2(dot(uv, vec2(127.1,311.7)),
              dot(uv, vec2(269.5,183.3)));
    return 2.0 * fract(sin(uv) * 43758.5453123) - 1.0;
  }

  // Perlin noise function for smooth random noise generation
  float perlinNoise(vec2 uv) {
    vec2 iuv = floor(uv);
    vec2 fuv = fract(uv);
    vec2 blur = smoothstep(.10, 1., fuv);
    float b = mix(dot(hash22(iuv + vec2(.0, .0)), fuv - vec2(.0, .0)), 
                  dot(hash22(iuv + vec2(1., .0)), fuv - vec2(1., .0)), blur.x);
    float t = mix(dot(hash22(iuv + vec2(.0, 1.)), fuv - vec2(.0, 1.)), 
                  dot(hash22(iuv + vec2(1., 1.)), fuv - vec2(1., 1.)), blur.x);
    return mix(b, t, blur.y);
  }

  // Fractal Brownian Motion function for layered noise effects
  float fbm(vec2 uv, int octaves) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 2.0;
    for(int i = 0; i < octaves; i++) {
      value += perlinNoise(uv) * amplitude;
      uv *= frequency;
      amplitude *= 0.5;
    }
    return value;
  }

  // Converts a hue value into an RGB color
  vec4 hue2rgb(float hue) {
    hue = fract(hue); // Ensure the hue is wrapped around [0,1]
    float r = abs(hue * 6.0 - 3.0) - 1.0;
    float g = 2.0 - abs(hue * 6.0 - 2.0);
    float b = 2.0 - abs(hue * 6.0 - 4.0);
    return clamp(vec4(r, g, b, 1.0), 0.0, 1.0); // Clamp to valid RGB range
  }

  // Adjusted HSV to RGB conversion for specific color transitions
  vec4 hsv2rgb(vec3 hsv) {
    float hue;
    // Determine hue based on time, oscillating between two values
    if (iTime - floor(iTime) < 0.5) {
      hue = 0.33; // Neon green
    } else {
      hue = 0.83; // Neon purple
    }
    return hue2rgb(hue); // Convert the chosen hue to RGB
  }

  void main() {
    // Calculate normalized device coordinates
    vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
    // Apply noise to UV coordinates
    uv += fbm(uv + iTime * 0.5, 20);
    float dist = abs(uv.x); // Distance from center for radial effect
    vec3 col;
    if (iMouse.xy != vec2(0.0)) {
      vec2 mouseUV = iMouse.xy / iResolution.xy;
      col = hsv2rgb(vec3(mouseUV.x, 1.0, 1.0)).rgb; // Dynamic hue based on mouse position
      } else {
      col = hsv2rgb(vec3(0.5, 1.0, 1.0)).rgb; // Default hue when no mouse interaction
      }// Reduce brightness by scaling down color components
      float brightnessFactor = 0.1; // Adjust to control brightness
      col *= brightnessFactor;
      
      // Apply a vignette effect based on distance from center and mix with noise
      col *= mix(1.0, 0.05, hash21(vec2(iTime))) / dist;
      
      // Output the final color with full opacity
      gl_FragColor = vec4(col, 1.0);
      
      }
      `;

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={{
        iResolution: { value: new THREE.Vector3(1920, 1080, 1) },
        iTime: { value: 0 },
        iMouse: { value: new THREE.Vector4() },
      }}
    />
  );
};

const Scene = () => {
  const thunderCount = 7;
  const aspectRatio = window.innerWidth / window.innerHeight;

  const thunders = Array.from({ length: thunderCount }, (_, index) => (
    <mesh
      key={index}
      position={[
        (Math.random() - 0.7) * aspectRatio * 4, // Random x position within a wider range
        (Math.random() - 0.5) * 4, // Random y position within a range
        0,
      ]}
    >
      <planeGeometry args={[1920, 1080]} />
      <ShaderMaterial />
    </mesh>
  ));

  return <>{thunders}</>;
};

const ThunderBackground = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh' }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 1],
      }}
    >
      <Scene />
    </Canvas>
  );
};

export default ThunderBackground;