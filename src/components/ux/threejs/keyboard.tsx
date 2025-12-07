import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from 'three';
import { JSX, useRef, useState } from "react";

type Props = JSX.IntrinsicElements['group'] & {
    initialScale: number;
    initialPosition: [number, number, number];
};


export default function KeyboardModel({ initialScale, initialPosition, ...props }: Props) {
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