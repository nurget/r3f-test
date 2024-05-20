import { OrbitControls } from "@react-three/drei";
import {useEffect, useRef} from "react";
import * as THREE from "three";

function Material3D() {
    const mesh1 = useRef()
    const mesh2 = useRef()

    useEffect(() => {
        mesh2.current.material = mesh1.current.material
    }, []);

    return (
        <>
            <OrbitControls />

            <ambientLight intensity={0.2} />
            <directionalLight position={[0, 1, 0]} />
            <directionalLight position={[1, 2, 8]} intensity={0.7} />

            <mesh ref={mesh1} position={[0.7, 0, 0]}>
                <boxGeometry/>
                {/* 광원에 영향을 안받는 유일한 */}
                {/*<meshBasicMaterial*/}
                {/*visible={true} // mesh가 보일지 안보일지*/}
                {/*transparent={true} // 재질에 대한 투명 효과를 사용할 것인지를 지정*/}
                {/*opacity={0.5} // 재질의 불투명도를 지정하는 값 (transparent를 true로 지정했을 때만 작동)*/}
                {/*depthTest={true} // 렌더링 되고 있는 mesh의 픽셀을 화면에 그릴 때 depth의 버퍼 값을 이용해서*/}
                {/*depthWrite={true} // z값을 뎁스 버퍼에록 기할 것인지 여부 결정*/}
                {/*side={THREE.FrontSide} // mesh의 앞면만, 뒷면만, 둘 다 렌더링 할 건지 결정*/}
                {/*    color="#ffff00" wireframe={false} />*/}
                <meshPhongMaterial
                    visible={true} // mesh가 보일지 안보일지
                    transparent={false} // 재질에 대한 투명 효과를 사용할 것인지를 지정
                    opacity={1} // 재질의 불투명도를 지정하는 값 (transparent를 true로 지정했을 때만 작동)
                    depthTest={true} // 렌더링 되고 있는 mesh의 픽셀을 화면에 그릴 때 depth의 버퍼 값을 이용해서
                    depthWrite={true} // z값을 뎁스 버퍼에 기록할 것인지 여부 결정
                    side={THREE.FrontSide} // mesh의 앞면만, 뒷면만, 둘 다 렌더링 할 건지 결정

                    color={0xff0000}
                    emissive={0x00000} // 재질 자체에서 발광하는 색상 값
                    specular={0xffff00} // 광원에 의해 반사되는 색상값 (기본값: 연한 회색)
                    shininess={100}
                    flatShading={true} // mesh를 평평하게 렌더링할지 여부
                    wireframe={false}
                />
            </mesh>

            <mesh ref={mesh2} position={[-0.7, 0, 0]}>
                <torusGeometry args={[0.5, 0.2]}/>
            </mesh>
        </>
    )
}

export default Material3D;