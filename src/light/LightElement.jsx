import React from "react";
import {OrbitControls} from "@react-three/drei";
import {exp} from "three/examples/jsm/nodes/math/MathNode.js";
import * as THREE from 'three';
import {useFrame} from "@react-three/fiber";

const torusGeometry = new THREE.TorusGeometry(0.4, 0.1, 32, 32)
const torusMaterial = new THREE.MeshStandardMaterial({
    color: "#9b59b6",
    roughness: 0.5,
    metalness: 0.9
})

function LightElement() {
    useFrame((state) => {
        const time = state.clock.elapsedTime
        const smallSpherePivot = state.scene.getObjectByName("smallSpherePivot")
        smallSpherePivot.rotation.y = THREE.MathUtils.degToRad(time * 50)
    })
    return (
        <>
            <OrbitControls/>

            <ambientLight color="#ffffff" intensity={5}/>
            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <planeGeometry args={[10, 10]}/>
                <meshStandardMaterial
                    color="#2980B9"
                    roughness={0.5}
                    metalness={0.5}
                    side={THREE.DoubleSide}
                />
            </mesh>

            <mesh rotation-x={THREE.MathUtils.degToRad(-90)}>
                <sphereGeometry args={[1.5, 64, 64, 0, Math.PI]}/>
                <meshStandardMaterial
                    color="#ffffff"
                    roughness={0.1}
                    metalness={0.2}
                />
            </mesh>

            {new Array(7).fill().map((item, index) => {
                return (
                    <group key={index} rotation-y={THREE.MathUtils.degToRad(45 * index)}>
                        <mesh
                            geometry={torusGeometry}
                            material={torusMaterial}
                            position={[3, 0.5, 0]}
                        />
                    </group>
                )
            })}

            <group name="smallSpherePivot">
                <mesh position={[3, 0.5, 0]}>
                    <sphereGeometry args={[0.3, 32, 32]}/>
                    <meshStandardMaterial
                        color="#e74c3c"
                        roughness={0.2}
                        metalness={0.5}
                    />
                </mesh>
            </group>
        </>
    )
}

export default LightElement;