import React from 'react';
import MyElement3D from "./MyElement3D.jsx";
import Material3D from "./material/Material3D.jsx";
import {Canvas} from "@react-three/fiber";
import {Leva} from "leva";
import MeshStandardMaterial from "./material/MeshStandardMaterial.jsx";
import MeshPhysicalMaterial from "./material/MeshPhysicalMaterial.jsx";

const App = () => {
    return (
        // <MyElement3D />
        <div style={{height: "100vh"}}>
            <Canvas>
                <MeshPhysicalMaterial />
            </Canvas>
            <Leva/>
        </div>
    )
}

export default App;