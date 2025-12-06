'use client'

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { memo, useRef } from "react";
import FuzzyText from "../ui/shadcn-io/fuzzy-text";
import { Scene } from "../ux/threejs/scene";
import { useGLTF } from "@react-three/drei";
import { KeyboardBlock } from "./keyboard-block";

export default memo(function Hero() {

    const ref = useRef<HTMLDivElement | null>(null)

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start start', 'end start']
    })

    const isInView = useInView(ref, {
        amount: 'all',
        margin: "-10% 0px 10% 0px"
    })

    const y = useTransform(scrollYProgress, [0, 1], [0, 300])

    return (
        <motion.div ref={ref}
            animate={{ scaleY: isInView ? .5 : 1 }}
            transition={{ duration: .5 }}
            viewport={{ once: false }}
            className={`relative bg-linear-primary-90 pt-30`}
        >
            <div className="container">
                <motion.div className="relative" transition={{ duration: .3 }}>
                    <motion.div
                        initial={{ opacity: 0, y: -100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: .3 }}
                        className="font-title flex justify-center">
                        <FuzzyText
                            fontSize="clamp(3rem, 12vw, 6rem)"
                            fontWeight={400}
                            fontFamily="inherit"
                            color="primary"
                            enableHover={true}
                            baseIntensity={0.10}
                            hoverIntensity={0.3}

                        >
                            {'</Keyboard>'}
                        </FuzzyText>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: -140 }}
                        animate={{ opacity: 1, y: 0 }}

                        className="text-center mx-auto w-max mt-2.5 origin-left">Лучшая клавиатура в мире, с задержкой
                        <span className="font-bold line-through decoration-1 rounded-md"> почти </span>
                        быстрее скорости света
                    </motion.div>
                </motion.div>
            </div >
        </motion.div >
    )
})