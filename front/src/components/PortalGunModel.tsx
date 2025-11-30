"use client";

import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Canvas,useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

interface GLTF {
    scene: THREE.Group;
}

function PortalGunModelBase() {
    const modelRef = useRef<THREE.Group>(null!);
    const gltf = useLoader(GLTFLoader, "/portalGun/scene.gltf") as GLTF;
    const { camera } = useThree();

    useEffect(() => {
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const size = box.getSize(new THREE.Vector3()).length();

        camera.position.set(0, 0, size * 0.2);
        camera.updateProjectionMatrix();

    }, [gltf, camera]);


    return (
        <group ref={modelRef} scale={0.2}>
            <primitive object={gltf.scene} />
        </group>
    );
}

export function PortalGun() {
    return (
        <Canvas
            style={{ width: "100%", height: "100%" }}
        >
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <OrbitControls enableZoom={false} enablePan={false} />
            <PortalGunModelBase />
        </Canvas>
    );
}
