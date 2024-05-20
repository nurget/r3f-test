import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function InteractiveModel() {
    const meshRef = useRef();

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowRight') {
            meshRef.current.rotation.y += 0.1; // 오른쪽 화살표 키를 누르면 y축을 중심으로 회전
        } else if (event.key === 'ArrowLeft') {
            meshRef.current.rotation.y -= 0.1; // 왼쪽 화살표 키를 누르면 y축을 중심으로 회전
        }
    };

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += rotationSpeed;
        }
    });

    return (
        <mesh ref={meshRef} onKeyDown={handleKeyDown} tabIndex={0}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial color="royalblue" />
        </mesh>
    );
}

function App() {
    return (
        <Canvas>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={1} />
            <InteractiveModel />
        </Canvas>
    );
}

export default App;
