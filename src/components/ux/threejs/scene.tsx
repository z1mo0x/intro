'use client'

import { Canvas, useFrame } from '@react-three/fiber';
import { motion } from 'framer-motion';
import KeyboardModel from './keyboard';
import * as THREE from 'three';
import { useEffect, useRef } from 'react';
import { useLenisSmooth } from '@/hooks/useLenisSmooth';

function AnimatedCamera() {

    const scrollValue = useLenisSmooth()
    console.log(scrollValue);


    useFrame(({ camera }) => {
        camera.position.x = THREE.MathUtils.lerp(5, 0, .5);
        camera.lookAt(0, 0, 0);
    });
    return null;
}

export function Scene() {
    return (
        <motion.div className={`fixed w-full h-full top-0 left-0 z-0`}>
            <Canvas
                camera={{ position: [0, 2, 3], fov: 35, near: 0.1, far: 100 }}
            >
                <AnimatedCamera />
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 4, 5]} intensity={1.5} />

                <KeyboardModel initialScale={1} rotation={[.7, 0, 0]} initialPosition={[1.5, -.7, 0]} />

                {/* <OrbitControls enableDamping /> */}
            </Canvas>
        </motion.div>
    )
}