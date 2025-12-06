'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect } from 'react';

export function useLenisSmooth() {
    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,  // сглаживать колесо мыши
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);
}
