import {OrbitControls, useTexture} from "@react-three/drei";
import {useEffect, useRef} from "react";
import * as THREE from "three";
import {useControls} from "leva";

function MeshPhysicalMaterial() {
    const mesh1 = useRef()
    const mesh2 = useRef()

    useEffect(() => {
        mesh2.current.material = mesh1.current.material
    }, []);

    const matcap = useTexture("./images/matcap.jpg")

    return (
        <>
            <OrbitControls/>

            {/*<ambientLight intensity={0.2} />*/}
            {/*<directionalLight position={[0, 1, 0]} />*/}
            {/*<directionalLight position={[1, 2, 8]} intensity={0.7} />*/}

            <mesh ref={mesh1} position={[0.7, 0, 0]}>
                <torusKnotGeometry args={[0.5, 0.15, 256, 128]}/>
                <meshMatcapMaterial matcap={matcap}
                                    flatShading={false} // 각진 면 표현
                />
            </mesh>

            <mesh ref={mesh2} position={[-0.7, 0, 0]}>
                <torusGeometry args={[0.5, 0.2]}/>
            </mesh>
        </>
    )
}

export default MeshPhysicalMaterial;