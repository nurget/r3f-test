import React, { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { Leva, useControls } from "leva";
import * as THREE from "three";

function MyElement3D() {
    const refMesh = useRef();
    const refWireMesh = useRef();

    const { topRadius, bottomRadius, height,
        radialSegments, heightSegments, bOpen,
        thetaStart, thetaLength } = useControls({
        topRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
        bottomRadius: { value: 1, min: 0.1, max: 5, step: 0.01 },
        height: { value: 1, min: 0.1, max: 5, step: 0.01},
        radialSegments: { value: 32, min: 3, max: 256, step: 1},
        heightSegments: { value: 1, min: 1, max: 256, step: 1},
        bOpen: { value: false },
        thetaStart: { value: 0, min: 0, max: 360, step: 0.01},
        thetaLength: { value: 360, min: 0, max: 360, step: 0.01},
    });

    useEffect(() => {
        if (refMesh.current && refWireMesh.current) {
            refWireMesh.current.geometry = refMesh.current.geometry;
        }
    }, [topRadius, bottomRadius, height, radialSegments, heightSegments, bOpen, thetaStart, thetaLength]);

    return (
        <>
            <OrbitControls />

            <ambientLight intensity={0.1} />
            <directionalLight position={[2, 1, 3]} intensity={0.5} />

            <mesh ref={refMesh}>
                {/*<sphereGeometry args={[ radius, widthSegments, heightSegments,*/}
                {/*    phiStart * Math.PI/180, phiLength * Math.PI/180,*/}
                {/*    thetaStart * Math.PI/180, thetaLength * Math.PI/180 ]} />*/}
                <cylinderGeometry args={[ topRadius, bottomRadius, height, radialSegments, heightSegments, bOpen,
                thetaStart * Math.PI / 180, thetaLength * Math.PI / 180 ]} />
                <meshStandardMaterial color="#1abc9c" />
            </mesh>

            <mesh ref={refWireMesh}>
                <meshStandardMaterial emissive="yellow" wireframe={true} />
            </mesh>

            <axesHelper scale={10} />
        </>
    );
}

export default function App() {
    return (
        <div style={{ height: "100vh" }}>
            <Canvas>
                <MyElement3D />
            </Canvas>
            <Leva />
        </div>
    );
}
