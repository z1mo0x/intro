'use client'

import { navItems } from "@/config/navigation";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "../ui/navigation-menu";
import Link from "next/link";
import { Button } from "../ui/button";
import { motion } from 'framer-motion'
import { memo, useEffect, useState } from "react";
import { ThemeSwitcher } from "../ui/shadcn-io/theme-switcher";
import { useTheme } from "next-themes";

export default memo(function Header() {

    const { theme, setTheme } = useTheme()

    console.log(theme);


    return (
        <motion.header
            initial={{ y: -100, scaleY: 0 }}
            animate={{ y: 0, scaleY: 1 }}
            transition={{ duration: .5, type: "spring", stiffness: 35 }}
            className="bg-white/70 origin-top backdrop-blur-[5px] py-5 z-10 text-primary fixed w-full left-0 top-0 shadow-lg shadow-white/30">
            <div className="container">
                <div className="flex justify-between items-center">
                    <div className="flex gap-10">
                        <div className="text-2xl font-extrabold">
                            <Link href={'/'}>
                                {'<Shop/>'}
                            </Link>
                        </div>
                        {/* <NavigationMenu>
                            <NavigationMenuList>
                                {navItems.map((item) => {
                                    return (
                                        <NavigationMenuItem className="" key={item.title}>
                                            <NavigationMenuLink asChild>
                                                <Link href={item.link}>{item.title}</Link>
                                            </NavigationMenuLink>
                                        </NavigationMenuItem>
                                    )
                                })}
                            </NavigationMenuList>
                        </NavigationMenu> */}
                    </div>
                    <div className="flex gap-5">
                        <ThemeSwitcher defaultValue="light" />
                        <Button variant='secondary'>Войти</Button>
                    </div>
                </div>
            </div>
        </motion.header>
    )
})