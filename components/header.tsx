"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Image from "next/image"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative w-24 h-12">
              <Image 
                src="/Logo.svg" 
                alt="Peaceful Path Logo" 
                fill 
                className="object-contain [filter:invert(24%)_sepia(19%)_saturate(1094%)_hue-rotate(118deg)_brightness(94%)_contrast(87%)]"
                priority
              />
            </div>
          </Link>

          {/* Text Logo (Center) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <div className="relative w-48 h-12">
              <Image 
                src="/Text.svg" 
                alt="Peaceful Path" 
                fill 
                className="object-contain [filter:invert(24%)_sepia(19%)_saturate(1094%)_hue-rotate(118deg)_brightness(94%)_contrast(87%)]"
                priority
              />
            </div>
          </div>

          {/* Desktop Navigation and Book Now Button */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Book Now Button */}
            <Button asChild className="bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none px-6 py-2 tracking-wide font-cormorant text-lg">
              <Link href="/book">Book Now</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop/Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="font-cormorant text-lg text-gray-600 hover:text-teal-600 py-2" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link
                href="/services"
                className="font-cormorant text-lg text-gray-600 hover:text-teal-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/blog"
                className="font-cormorant text-lg text-gray-600 hover:text-teal-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/book"
                className="font-cormorant text-lg text-gray-600 hover:text-teal-600 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </Link>
              <Button asChild className="bg-transparent border-2 border-teal-600 text-teal-600 hover:bg-teal-50 rounded-none py-2 tracking-wide font-cormorant text-lg w-full mt-2">
                <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                  Book an Appointment
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
