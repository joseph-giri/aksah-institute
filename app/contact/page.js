'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Mail,
    Phone,
    MapPin,
    Send,
    CheckCircle2,
    Globe,
    Loader2,
    Clock
} from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ContactPage() {
    const [status, setStatus] = useState('idle') // idle, loading, success

    const handleSubmit = (e) => {
        e.preventDefault()
        setStatus('loading')
        // Simulate API call
        setTimeout(() => {
            setStatus('success')
        }, 1500)
    }

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                        {/* Info Section */}
                        <div>
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                                    Get in <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Touch</span>
                                </h1>
                                <p className="text-lg text-muted-foreground mb-12 max-w-lg">
                                    Have questions about our courses or certification process? Our team is here to help you navigate your tech journey.
                                </p>

                                <div className="space-y-8">
                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Mail className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Email Us</div>
                                            <div className="text-xl font-bold">contact@aksah.edu</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Phone className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Call Us</div>
                                            <div className="text-xl font-bold">+977 1-4XXXXXX</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <MapPin className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Visit Us</div>
                                            <div className="text-xl font-bold">Main Street, Kathmandu, Nepal</div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-6">
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                            <Clock className="text-primary" size={24} />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-1">Working Hours</div>
                                            <div className="text-xl font-bold">Sun - Fri: 9:00 AM - 6:00 PM</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Form Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[80px] -z-10" />

                                {status === 'success' ? (
                                    <div className="py-20 text-center">
                                        <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                                            <CheckCircle2 size={40} className="text-emerald-500" />
                                        </div>
                                        <h3 className="text-3xl font-bold mb-4">Message Sent!</h3>
                                        <p className="text-muted-foreground mb-8">We've received your inquiry and will get back to you shortly.</p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="text-primary font-bold hover:underline"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Full Name</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="Enter your name"
                                                className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Email Address</label>
                                            <input
                                                required
                                                type="email"
                                                placeholder="your@email.com"
                                                className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Subject</label>
                                            <select className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all appearance-none">
                                                <option>General Inquiry</option>
                                                <option>Course Information</option>
                                                <option>Certificate Verification Issues</option>
                                                <option>Partnership Interest</option>
                                            </select>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                                            <textarea
                                                required
                                                rows="5"
                                                placeholder="How can we help you?"
                                                className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all resize-none"
                                            />
                                        </div>

                                        <button
                                            disabled={status === 'loading'}
                                            className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg"
                                        >
                                            {status === 'loading' ? (
                                                <Loader2 className="animate-spin" size={24} />
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={20} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    )
}
