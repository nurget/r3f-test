// src/components/ScrollRotatingSpheresAndModel.js
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const ScrollRotatingSpheresAndModel = ({ radius, speed }) => {
    const groupRef = useRef();
    const lightRef1 = useRef();
    const lightRef2 = useRef();
    const { nodes } = useGLTF("/new-y-model.glb");

    // 스크롤 이벤트 핸들러
    const handleScroll = (event) => {
        const deltaX = event.deltaX;
        const rotation = deltaX * 0.001; // 회전 각도 조정 (조금씩 회전하도록 설정)

        if (groupRef.current) {
            groupRef.current.rotation.x += rotation;
        }
    };

    useEffect(() => {
        // 휠 이벤트 리스너 등록
        window.addEventListener("wheel", handleScroll);
        return () => {
            // 컴포넌트 언마운트 시 휠 이벤트 리스너 제거
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime() * speed;

        if (lightRef1.current && lightRef2.current) {
            lightRef1.current.position.x =
                radius * Math.cos(elapsedTime) + Math.sin(elapsedTime * 0.5);
            lightRef1.current.position.y =
                radius * Math.sin(elapsedTime) + Math.cos(elapsedTime * 0.5);
            lightRef1.current.position.z = radius * Math.sin(elapsedTime);

            lightRef2.current.position.x =
                -radius * Math.cos(elapsedTime) + Math.cos(elapsedTime * 0.5);
            lightRef2.current.position.y =
                -radius * Math.sin(elapsedTime) + Math.sin(elapsedTime * 0.5);
            lightRef2.current.position.z = -radius * Math.sin(elapsedTime);
        }
    });

    return (
        <group ref={groupRef}>
            <mesh position={[radius, 0, 0]} layers={1}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#0083ff" roughness={1} metalness={0.2} />
                <pointLight
                    ref={lightRef1}
                    color="blue"
                    intensity={5}
                    distance={5}
                    decay={2}
                />
            </mesh>
            <mesh position={[-radius, 0, 0]} layers={1}>
                <sphereGeometry args={[0.1, 32, 32]} />
                <meshStandardMaterial color="#0083ff" roughness={1} metalness={0.2} />
                <pointLight
                    ref={lightRef2}
                    color="blue"
                    intensity={5}
                    distance={5}
                    decay={2}
                />
            </mesh>
            {nodes ? (
                <mesh
                    ref={groupRef}
                    geometry={nodes.Cube018.geometry}
                    receiveShadow
                    castShadow
                    layers={0}
                >
                    <meshStandardMaterial
                        color="white"
                        emissive="white"
                        roughness={0.1}
                        metalness={0.1}
                        reflectivity={1}
                        clearcoat={1}
                        clearcoatRoughness={0.1}
                    />
                </mesh>
            ) : null}
        </group>
    );
};

export default ScrollRotatingSpheresAndModel;
