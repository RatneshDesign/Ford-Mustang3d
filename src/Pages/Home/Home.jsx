import React, { Suspense, useRef, useLayoutEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, useGLTF, OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Model({ url, scale = 1 }) {
    const { scene } = useGLTF(url);
    const groupRef = useRef();

    useLayoutEffect(() => {
        if (!groupRef.current) return;

        const ctx = gsap.context(() => {
            // Rotate as you scroll
            //   gsap.to(groupRef.current.rotation, {
            //     y: Math.PI * 2,
            //     scrollTrigger: {
            //       trigger: "#scroll-section",
            //       start: "top top",
            //       end: "bottom bottom",
            //       scrub: true,
            //     },
            //   });

            // Move forward slightly
            gsap.to(groupRef.current.position, {
                x: 3.5,
                scrollTrigger: {
                    trigger: "#section1",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            }, 'about');
            gsap.to(groupRef.current.rotation, {
                x: -0.2,
                y: -0.4,
                z: 0.1,
                scrollTrigger: {
                    trigger: "#section1",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            }, 'about');

            gsap.to(groupRef.current.position, {
                x: 1,
                z: 1,
                scrollTrigger: {
                    trigger: "#section2",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            }, 'topview');
            gsap.to(groupRef.current.rotation, {
                x: 1,
                y: 1.69,
                // z: 0.1,
                scrollTrigger: {
                    trigger: "#section2",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            }, 'topview');

            gsap.to(groupRef.current.position, {
                x: -4,
                y: -0,
                z: 3,
                scrollTrigger: {
                    trigger: "#section3",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            },'tofrontview');
            gsap.to(groupRef.current.rotation, {
                // x: 1.2,
                // y: 1.69,
                // z: -2,
                x: 1,
                y: 1.69,
                z: 0.3,
                scrollTrigger: {
                    trigger: "#section3",
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: true,
                    markers: true,
                },
            }, 'tofrontview');

        });

        return () => ctx.revert();
    }, []);

    return (
        <group ref={groupRef} scale={scale} position={[2.1, -0.6, -2]} rotation={[-0.1, -0.5, 0]}>
            <primitive object={scene} />
        </group>
    );
}

function Home() {
    return (
        <div id="scroll-section" style={{ height: "500vh" }}>
            <span className="flex absolute text-[25rem] w-screen h-screen items-center justify-center">
                <h1 className="font-bold z-[-1]">She</h1>
                <h1 className="font-bold z-10">lbY</h1>
                <span className="text-2xl absolute bottom-[20px] tracking-[30px] ">Ford</span>
            </span>
            <div
                id="canvas-container"
                style={{
                    position: "sticky",
                    top: 0,
                    width: "100%",
                    height: "100vh",
                }}
                className="flex items-center justify-center"
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
                        <hemisphereLight intensity={0.35} />

                        <Model url="/ford_mustang_shelby.glb" scale={1.2} />

                        <Environment preset="city" />
                        <OrbitControls enableZoom={false} />
                    </Suspense>
                </Canvas>
            </div>

            <section id="section1" className="flex h-screen bg-amber-300 justify-start items-center px-[5vw]">
                <span className="w-[30%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iure esse doloribus iste impedit fuga tempore voluptates culpa temporibus aspernatur.</span>
            </section>
            <section id="section2" className="flex h-screen bg-amber-600 justify-start items-center px-[5vw]">
                <span className="w-[30%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iure esse doloribus iste impedit fuga tempore voluptates culpa temporibus aspernatur.</span>
            </section>
            <section id="section3" className="flex h-screen bg-amber-800 justify-start items-center px-[5vw]">
                <span className="w-[30%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Error iure esse doloribus iste impedit fuga tempore voluptates culpa temporibus aspernatur.</span>
            </section>
        </div>
    );
}

export default Home;
