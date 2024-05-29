"use client";
import React, { useRef } from 'react';
import { useFrame, useThree, Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;

  void mainImage(out vec4 fragColor, in vec2 fragCoord)
  {
    // Normalized pixel coordinates (from 0 to 1) with wave effect
    vec2 uv = fragCoord / iResolution.xy * 2.0 - 1.0;
    uv.y += 0.1 * sin(uv.x * 1.0 + iTime); // Adjust the values for magnitude and speed of the wave * 2.0

    float sinValue = abs(sin(iTime - uv.y));
    float lengthY = length(uv.y);
    float siri = sinValue / (lengthY + 0.0001) * 0.15;

    // Neon green color
    vec3 neonGreen = vec3(0.0, 1.0, 0.0);
    // Neon purple color
    vec3 neonPurple = vec3(0.5, 0.0, 1.0);

    vec3 color = siri * mix(neonGreen, neonPurple, abs(uv.x));

    // Output to screen
    fragColor = vec4(color, 0.1);
  }

  void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
  }
`;

const WaveRenderer = () => {
  const shaderRef = useRef();
  const { size } = useThree();

  useFrame(({ clock }) => {
    shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
    shaderRef.current.uniforms.iResolution.value = new THREE.Vector2(size.width, size.height);
  });

  return (
    <mesh>
      <planeGeometry args={[size.width / 100, size.height / 100]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2() },
        }}
      />
    </mesh>
  );
};

const Wave = () => {
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
      <WaveRenderer />
    </Canvas>
  );
};

export default Wave;
