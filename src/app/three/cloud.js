"use client";
import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;

  const float cloudscale = 1.1;
  const float speed = 0.03;
  const float clouddark = 0.5;
  const float cloudlight = 0.3;
  const float cloudcover = 0.2;
  const float cloudalpha = 8.0;
  const float skytint = 0.5;
  const vec3 skycolour1 = vec3(0.2, 0.4, 0.6);
  const vec3 skycolour2 = vec3(0.4, 0.7, 1.0);

  const mat2 m = mat2( 1.6,  1.2, -1.2,  1.6 );

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(mix(dot(hash(i + vec2(0.0, 0.0)), f - vec2(0.0, 0.0)), 
                   dot(hash(i + vec2(1.0, 0.0)), f - vec2(1.0, 0.0)), u.x), 
               mix(dot(hash(i + vec2(0.0, 1.0)), f - vec2(0.0, 1.0)), 
                   dot(hash(i + vec2(1.0, 1.0)), f - vec2(1.0, 1.0)), u.x), u.y);
  }

  vec2 hash(vec2 p) {
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
  }

  float fbm(vec2 n) {
    float total = 0.0, amplitude = 0.1;
    for (int i = 0; i < 5; i++) {
      total += noise(n) * amplitude;
      n = m * n;
      amplitude *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 p = gl_FragCoord.xy / iResolution.xy;
    vec2 uv = p * vec2(iResolution.x / iResolution.y, 1.0);
    float time = iTime * speed;
    float q = fbm(uv * cloudscale * 0.5);

    float r = 0.0;
    uv *= cloudscale;
    uv -= q - time;
    float weight = 0.8;
    for (int i = 0; i < 5; i++) {
      r += abs(weight * noise(uv));
      uv = m * uv + time;
      weight *= 0.6;
    }

    vec3 skycolour = mix(skycolour2, skycolour1, p.y);
    vec3 cloudcolour = vec3(1.1, 1.1, 0.9) * clamp(clouddark + cloudlight * r, 0.0, 1.0);
    float f = cloudcover + cloudalpha * r;

    vec3 result = mix(skycolour, clamp(skytint * skycolour + cloudcolour, 0.0, 1.0), clamp(f, 0.0, 1.0));
    gl_FragColor = vec4(result, 1.0);
  }
`;

const CloudRenderer = () => {
  const shaderRef = useRef();
  const { size } = useThree();

  useFrame(({ clock }) => {
    if (shaderRef.current) {
      shaderRef.current.uniforms.iTime.value = clock.getElapsedTime();
      shaderRef.current.uniforms.iResolution.value = new THREE.Vector2(size.width, size.height);
    }
  });

  useEffect(() => {
    const handleResize = () => {
      shaderRef.current.uniforms.iResolution.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <mesh>
      <planeGeometry args={[size.width / 200, size.height / 200]} />
      <shaderMaterial
        ref={shaderRef}
        fragmentShader={fragmentShader}
        uniforms={{
          iTime: { value: 0 },
          iResolution: { value: new THREE.Vector2(size.width, size.height) },
        }}
      />
    </mesh>
  );
};

const Cloud = () => {
  return (
    <Canvas
      style={{ width: '100%', height: '100vh', position: 'fixed', top: 0, left: 0 }}
      camera={{
        fov: 75,
        near: 0.1,
        far: 1000,
        position: [0, 0, 1],
      }}
    >
      <CloudRenderer />
    </Canvas>
  );
};

export default Cloud;
