import React, { Suspense, useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls, Center } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Model({ url, scale = 1 }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();

  useLayoutEffect(() => {
    if (!modelRef.current) return;

    // GSAP scroll animation
    gsap.to(modelRef.current.rotation, {
      y: Math.PI * 2, // full spin
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: "#canvas-container", // pin the canvas
      },
    });

    gsap.to(modelRef.current.position, {
      x: 2, // move right
      y: 0.5, // lift a little
      scrollTrigger: {
        trigger: "#scroll-section",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return <primitive ref={modelRef} object={scene} scale={scale} />;
}

function Home() {
  return (
    <div id="scroll-section" style={{ height: "400vh" }}>
      {/* Sticky Canvas */}
      <div
        id="canvas-container"
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
        }}
      >
        <Canvas camera={{ position: [2, 2, 6], fov: 50 }} shadows>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight
              castShadow
              intensity={1.2}
              position={[5, 10, 5]}
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <hemisphereLight intensity={0.35} groundColor="black" />

            <Center>
              <Model url="/ford_mustang_mach_1.glb" scale={1.2} />
            </Center>

            <Environment preset="city" />
            <OrbitControls enableZoom={false} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export default Home;
