'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Moon, Sun, Monitor, Menu, X } from 'lucide-react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme()
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useEffect(() => setMounted(true), [])

    if (!mounted) return null

    const NavLinks = [
        { name: 'Home', href: '/' },
        { name: 'Courses', href: '#courses' },
        { name: 'Verify Certificate', href: '#verify' },
        { name: 'About', href: '#about' },
    ]

    return (
        <nav className="fixed top-0 w-full z-50 glass border-b border-border/40 px-6 py-3">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex-1 flex items-center">
                    <Link href="/" className="relative z-10 transition-all hover:scale-105 duration-300">
                        <div className="w-14 h-14 md:w-30 md:h-16 flex items-center justify-center p-1 bg-white/5 rounded-2xl glass border border-white/10 shadow-lg overflow-hidden">
                            <img
                                src="/images/logo.png"
                                alt="Aksah Logo"
                                className="w-full h-full object-fill"
                            />
                        </div>
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center space-x-8">
                    {NavLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center space-x-4">
                    <button
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="p-2 rounded-full hover:bg-accent transition-colors"
                    >
                        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass border-t border-border/40 mt-4 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 space-y-4">
                            {NavLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="text-lg font-medium text-foreground/70 hover:text-primary transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}
