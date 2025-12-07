// useLenisSmooth.ts
'use client';

import Lenis from '@studio-freight/lenis';
import { useEffect, useRef, useState } from 'react';

export function useLenisSmooth() {


    const [scrollRef, setScrollRef] = useState(typeof window !== 'undefined' ? window.scrollY : 0)

    useEffect(() => {
        const lenis = new Lenis({
            lerp: 0.1,
            smoothWheel: true,
        });

        lenis.scrollTo(scrollRef, { immediate: true });

        lenis.on('scroll', (e: { scroll: number }) => {
            setScrollRef(e.scroll)
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

    return scrollRef
}
