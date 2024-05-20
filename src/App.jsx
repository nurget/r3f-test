import React from 'react';
import MyElement3D from "./MyElement3D.jsx";
import Material3D from "./material/Material3D.jsx";
import {Canvas} from "@react-three/fiber";
import MeshStandardMaterial from "./material/MeshStandardMaterial.jsx";
import MeshPhysicalMaterial from "./material/MeshPhysicalMaterial.jsx";
import MeshMatcapMaterial from "./material/MeshMatcapMaterial.jsx";
import LightElement from "./light/LightElement.jsx";
import './App.css';
import HemisphereLight from "./light/HemisphereLight.jsx";

const App = () => {
    return (
        // <MyElement3D />
        <div style={{height: "100vh"}}>
            <Canvas camera={{
                fov: 75,
                position: [7, 7, 0]
            }}>
                <HemisphereLight />
            </Canvas>
        </div>
    )
}

export default App;