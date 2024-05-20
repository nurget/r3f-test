import { OrbitControls } from "@react-three/drei";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";

function MeshPhysicalMaterial() {
    const mesh1 = useRef()
    const mesh2 = useRef()

    useEffect(() => {
        mesh2.current.material = mesh1.current.material
    }, []);

    const { roughness, metalness, clearcoat, clearcoatRoughness,
        transmission, thickness, ior} = useControls({
        roughness: { value: 0, min: 0, max: 1, step: 0.01 },
        metalness: { value: 0, min: 0, max: 1, step: 0.01 },
        clearcoat: { value: 0, min: 0, max: 1, step: 0.01 },
        clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
        transmission: { value: 0, min: 0, max: 1, step: 0.01 },
        thickness: { value: 0, min: 0, max: 1, step: 0.01 },
        ior: { value: 1.5, min: 0, max: 2.333, step: 0.01 },
    })

    return (
        <>
            <OrbitControls />

            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 1, 0]} />
            <directionalLight position={[1, 2, 8]} intensity={0.7} />

            <mesh ref={mesh1} position={[0.7, 0, 0]}>
                <torusKnotGeometry args={[0.5, 0.15, 256, 128]}/>

                <meshPhysicalMaterial
                    visible={true} // mesh가 보일지 안보일지
                    transparent={true} // 재질에 대한 투명 효과를 사용할 것인지를 지정
                    opacity={1} // 재질의 불투명도를 지정하는 값 (transparent를 true로 지정했을 때만 작동)
                    depthTest={true} // 렌더링 되고 있는 mesh의 픽셀을 화면에 그릴 때 depth의 버퍼 값을 이용해서
                    depthWrite={true} // z값을 뎁스 버퍼에 기록할 것인지 여부 결정
                    side={THREE.DoubleSide} // mesh의 앞면만, 뒷면만, 둘 다 렌더링 할 건지 결정

                    color={0xffffff}
                    emissive={0x00000} // 재질 자체에서 발광하는 색상
                    roughness={roughness} // 거칠기 (값 0은 표면이 거울과 같은 상태, 값 1은 거칠기가 최대값)
                    metalness={metalness} // 금 속성을 나타내는 속성 (값 0은 돌처럼 금 속성이 전혀 없, 값 1은 완전한 금속)
                    flatShading={false} // mesh를 평평하게 렌더링할지 여부
                    wireframe={false}
                    clearcoat={clearcoat} // 코팅 효과
                    clearcoatRoughness={clearcoatRoughness} // 코팅에 대한 거칠기값 (0은 거칠기 전혀 없, 1은 거칠기)

                    // 유리 효과는 투명도와 관련된 속성, true로 설정해야함
                    transmission={transmission} // 0은 전혀 투명하지 않음
                    thickness={thickness}
                    ior={ior} // 굴절율 1과 2.333... 사이 권장
                />
            </mesh>

            <mesh ref={mesh2} position={[-0.7, 0, 0]}>
                <torusGeometry args={[0.5, 0.2]}/>
            </mesh>
        </>
    )
}

export default MeshPhysicalMaterial;