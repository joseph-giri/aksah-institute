'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Search, ShieldAlert } from 'lucide-react'

export default function CertificateSearch() {
    const [certId, setCertId] = useState('')
    const [error, setError] = useState('')
    const router = useRouter()

    const handleSubmit = (e) => {
        e.preventDefault()
        setError('')

        if (!certId.trim()) {
            setError('Please enter a certificate number.')
            return
        }

        // Basic format validation (optional, can be customized)
        if (certId.length < 5) {
            setError('Invalid certificate format.')
            return
        }

        router.push(`/verify/${certId.trim()}`)
    }

    return (
        <section id="verify" className="py-24 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-primary/5 -skew-y-3 transform origin-top-left -z-10" />

            <div className="max-w-4xl mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="glass p-12 md:p-16 rounded-[2.5rem] border border-border/50 shadow-2xl"
                >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                        <Search size={32} className="text-primary" />
                    </div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Certificate Validator</h2>
                    <p className="text-muted-foreground mb-10 max-w-xl mx-auto">
                        Verify the authenticity of a certificate issued by Aksah Computer Institute. Enter the unique ID provided on the document.
                    </p>

                    <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
                        <div className="relative group">
                            <input
                                type="text"
                                placeholder="Enter Certificate ID (e.g., AK-2026-X89)"
                                value={certId}
                                onChange={(e) => setCertId(e.target.value)}
                                className="w-full px-6 py-5 rounded-2xl bg-background border border-border/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all text-lg font-medium"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-2 bottom-2 px-6 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg hover:shadow-primary/20 transition-all flex items-center gap-2"
                            >
                                Verify
                            </button>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mt-4 flex items-center justify-center gap-2 text-destructive font-medium"
                            >
                                <ShieldAlert size={18} />
                                {error}
                            </motion.div>
                        )}
                    </form>

                    <div className="mt-12 pt-12 border-t border-border/40 text-sm text-muted-foreground">
                        Having trouble? <Link href="/contact" className="text-primary hover:underline font-semibold">Contact Support</Link>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

import Link from 'next/link'
