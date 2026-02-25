'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code2, BrainCircuit, ShieldCheck, ExternalLink } from 'lucide-react'

const courses = [
    {
        title: 'Developer',
        description: 'Master full-stack development, mobile apps, and software engineering.',
        icon: Code2,
        color: 'bg-blue-600',
        tag: 'Popular'
    },
    {
        title: 'Design',
        description: 'UI/UX, Graphic Design, and visual storytelling for the digital age.',
        icon: BrainCircuit,
        color: 'bg-amber-500',
        tag: 'Hot'
    },
    {
        title: 'IT & Technology',
        description: 'Networking, hardware, and advanced system administration.',
        icon: ShieldCheck,
        color: 'bg-emerald-600',
        tag: 'Core'
    }
]

export default function CourseShowcase() {
    return (
        <section id="courses" className="py-24 px-6 bg-accent/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">World-Class Courses</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Our curriculum is designed by industry experts to prepare you for the high-demand tech jobs of tomorrow.
                    </p>
                </div>

                <div className="bento-grid">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            className="group glass p-8 rounded-3xl border border-border/50 hover:border-primary/50 relative overflow-hidden"
                        >
                            <div className={`w-14 h-14 ${course.color}/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                <course.icon size={28} className={course.color.replace('bg-', 'text-')} />
                            </div>

                            <span className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-widest text-primary/60 px-2 py-1 rounded-md bg-primary/5 border border-primary/10">
                                {course.tag}
                            </span>

                            <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{course.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                                {course.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto">
                                <button className="flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all">
                                    Learn More <ExternalLink size={16} />
                                </button>
                                <Link
                                    href={`/enroll?course=${encodeURIComponent(course.title)}`}
                                    className="px-4 py-2 bg-primary/10 text-primary text-xs font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all"
                                >
                                    Enroll Now
                                </Link>
                            </div>

                            {/* Decorative gradient for hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
