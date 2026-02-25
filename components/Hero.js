'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ShieldCheck } from 'lucide-react'

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 px-6 overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full blur-[128px] -z-10" />
            <div className="absolute bottom-0 -right-4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] -z-10" />

            <div className="max-w-7xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-[0.2em] text-primary uppercase bg-primary/10 rounded-full border border-primary/20">
                        Learn. Build. Get Hired.
                    </span>
                    <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.95]">
                        Igniting <span className="text-primary italic">Tech</span> Excellence <br className="hidden md:block" />
                        <span className="text-[#fbbf24]">Since 2072</span>.
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground mb-12 font-medium">
                        Aksa Institute of Technology provides world-class technical education in Charikot, empowering beginners and professional job-seekers with hands-on projects.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="#courses"
                            className="group relative px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2"
                        >
                            Explore Courses
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="#verify"
                            className="px-8 py-4 glass text-foreground font-semibold rounded-xl hover:bg-accent transition-all flex items-center gap-2"
                        >
                            <ShieldCheck size={20} className="text-primary" />
                            Verify Certificate
                        </Link>
                    </div>
                </motion.div>

                {/* Stats Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border/40 pt-10"
                >
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">5,000+</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-widest">Students</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">3k+</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-widest">Class Completed</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">98.9%</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-widest">Satisfaction Rate</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl md:text-4xl font-bold mb-1">12+</div>
                        <div className="text-sm text-muted-foreground uppercase tracking-widest">Courses</div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
