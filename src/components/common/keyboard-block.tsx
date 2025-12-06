'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Scene } from '../ux/threejs/scene';

export function KeyboardBlock() {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
        // 0 – верх секции у верхa экрана, 1 – низ секции у верха экрана
    });

    // масштаб: сначала 1 (фуллскрин), потом 0.6
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
    // смещение по X: из центра влево
    const x = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
    // ширина: с 100% до ~50%
    const width = useTransform(scrollYProgress, [0, 1], ['100%', '50%']);

    return (
        <section
            ref={ref}
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D-клава — сначала фуллскрин, потом сжимается влево */}
            <motion.div
                style={{ scale, x, width }}
                className="h-[500px]"
            >
                <Scene />
            </motion.div>

            {/* Правый текст — появляется позже */}
            <motion.div
                className="absolute right-12 max-w-md text-right"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    opacity: useTransform(scrollYProgress, [0.2, 1], [0, 1]),
                }}
            >
                <h2 className="text-3xl font-bold mb-4">Keyrox TKL</h2>
                <p className="text-muted-foreground">
                    Лучшая клавиатура в мире, с задержкой почти быстрее скорости света.
                </p>
            </motion.div>
        </section>
    );
}
