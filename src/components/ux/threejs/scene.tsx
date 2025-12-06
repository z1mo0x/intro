'use client'

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { JSX, memo, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';

type Props = JSX.IntrinsicElements['group'] & {
    initialScale: number;
    initialPosition: [number, number, number];
};


function KeyboardModel({ initialScale, initialPosition, ...props }: Props) {
    const { scene } = useGLTF('/models/keyboard.glb')
    const group = useRef<THREE.Group>(null)
    const [t, setT] = useState(0)

    useFrame((_, delta) => {
        if (t >= 1) return;

        const next = Math.min(1, t + delta * 1)
        setT(next)

        if (!group.current) return;

        group.current.position.y = THREE.MathUtils.lerp(-5, initialPosition[1], next);
        group.current.scale.y = .5

        setTimeout(() => {
            if (!group.current) return;

            group.current.scale.y = THREE.MathUtils.lerp(.5, 1, next);
        }, 1000)

        group.current.traverse(((child) => {
            if ((child as THREE.Mesh).material) {
                const keyboard = (child as THREE.Mesh).material as THREE.MeshStandardMaterial;
                keyboard.transparent = true;
                keyboard.opacity = THREE.MathUtils.lerp(0, 1, next)
            }
        }))

    })


    return (
        <group scale={initialScale} position={initialPosition} ref={group} {...props}>
            <primitive object={scene}></primitive>
        </group>
    )
}

export function Scene() {
    return (
        <motion.div className={`fixed w-full h-full top-0 left-0`}>
            <Canvas
                camera={{ position: [0, 2, 3], fov: 35, near: 0.1, far: 100 }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[2, 4, 5]} intensity={1.5} />

                <KeyboardModel initialScale={1} rotation={[.7, 0, 0]} initialPosition={[1.5, -.7, 0]} />

                {/* <OrbitControls enableDamping /> */}
            </Canvas>
        </motion.div>
    )
}