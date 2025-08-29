"use client";
import { ArrowUpRight, Menu, Moon, X } from "lucide-react"
import React, { useRef } from "react"

const Hero = () => {
const sideMenu = useRef<HTMLUListElement | null>(null);

const openMenu = () => {
   if(sideMenu.current) {
    sideMenu.current.style.transform = 'translateX(-16rem)'
   }
}
const closeMenu = () => {
    if (sideMenu.current) {
        sideMenu.current.style.transform = 'translateX(16rem)'
    }
}
  return (
    <>
    <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex justify-between items-center z-50'>
        <a href="" className='text-2xl font-semibold cursor-pointer '>
            Abjith 
        </a>
        <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-50 cursor-pointer'>
            <li>Home</li>
            <li>About</li>
            <li>Skill</li>
            <li>Project</li>
            <li>Contact</li>
        </ul>
        <div className='flex items-center gap-4'>
            <Moon />
            <a href="" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4'>Resume <ArrowUpRight /></a>
            <button onClick={openMenu} className='block md:hidden ml-3'>
                <Menu />
            </button>
        </div>

        {/* mobile menu */}

        <ul  ref={sideMenu} className='flex flex-col gap-4 py-20 px-10 fixed -right-64 top-0 bottom-0 w-64 z-50 h-screen cursor-pointer bg-rose-50 transition duration-500'>
            <div onClick={closeMenu} className='absolute right-6 top-6'>
                <X  className='w-5 cursor-pointer ' />
            </div>
            <li>Home</li>
            <li>About</li>
            <li>Skill</li>
            <li>Project</li>
            <li>Contact</li>
        </ul>
    </nav>
    </>
  )
}

export default Hero
