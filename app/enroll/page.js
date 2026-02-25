'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
    Send,
    CheckCircle2,
    User,
    Mail,
    BookOpen,
    MessageSquare,
    ArrowRight,
    Loader2
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

function EnrollmentForm() {
    const searchParams = useSearchParams()
    const initialCourse = searchParams.get('course') || ''

    const [formData, setFormData] = useState({
        student_name: '',
        email: '',
        course_name: initialCourse,
        message: ''
    })
    const [status, setStatus] = useState('idle') // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setStatus('loading')
        setErrorMessage('')

        try {
            const { error } = await supabase
                .from('enrollments')
                .insert([formData])

            if (error) throw error

            setStatus('success')
        } catch (err) {
            console.error('Enrollment error:', err)
            // Note: If the enrollments table doesn't exist yet, this will fail.
            // In a real scenario, the user would have created the table.
            setErrorMessage(err.message || 'Failed to submit enrollment. Please try again later.')
            setStatus('error')
        }
    }

    if (status === 'success') {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass p-12 md:p-16 rounded-[2.5rem] border border-emerald-500/20 text-center shadow-2xl"
            >
                <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Application Received!</h2>
                <p className="text-muted-foreground mb-10 max-w-sm mx-auto">
                    Thank you for choosing Aksah Institute. Our admissions team will contact you at <strong>{formData.email}</strong> within 24 hours.
                </p>
                <button
                    onClick={() => window.location.href = '/'}
                    className="px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg transition-all"
                >
                    Return to Home
                </button>
            </motion.div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 shadow-2xl"
        >
            <h2 className="text-3xl font-bold mb-8">Course Enrollment</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <User size={14} /> Full Name
                        </label>
                        <input
                            required
                            value={formData.student_name}
                            onChange={(e) => setFormData({ ...formData, student_name: e.target.value })}
                            placeholder="Enter your name"
                            className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                            <Mail size={14} /> Email Address
                        </label>
                        <input
                            required
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="your@email.com"
                            className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <BookOpen size={14} /> Selected Course
                    </label>
                    <select
                        required
                        value={formData.course_name}
                        onChange={(e) => setFormData({ ...formData, course_name: e.target.value })}
                        className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all appearance-none"
                    >
                        <option value="">Select a course</option>
                        <option value="Full Stack Web Dev">Full Stack Web Dev</option>
                        <option value="AI Prompt Engineering">AI Prompt Engineering</option>
                        <option value="Cyber Security">Cyber Security</option>
                    </select>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                        <MessageSquare size={14} /> Message (Optional)
                    </label>
                    <textarea
                        rows="4"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your learning goals..."
                        className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all resize-none"
                    />
                </div>

                {status === 'error' && (
                    <p className="text-destructive text-sm font-medium bg-destructive/10 p-4 rounded-xl border border-destructive/20">
                        {errorMessage}
                    </p>
                )}

                <button
                    disabled={status === 'loading'}
                    className="w-full bg-primary text-primary-foreground py-5 rounded-2xl font-bold hover:shadow-xl hover:shadow-primary/20 disabled:opacity-50 transition-all flex items-center justify-center gap-3 text-lg"
                >
                    {status === 'loading' ? (
                        <Loader2 className="animate-spin" size={24} />
                    ) : (
                        <>
                            Submit Application
                            <ArrowRight size={20} />
                        </>
                    )}
                </button>
            </form>

            <p className="mt-8 text-center text-xs text-muted-foreground">
                By submitting, you agree to our <a href="#" className="underline">Privacy Policy</a> and <a href="#" className="underline">Terms of Service</a>.
            </p>
        </motion.div>
    )
}

export default function EnrollmentPage() {
    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 px-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

                <div className="max-w-3xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">Master the Digital Era</h1>
                        <p className="text-muted-foreground text-lg">Join 5,000+ students on their journey to excellence.</p>
                    </div>

                    <Suspense fallback={<div className="glass p-20 flex justify-center"><Loader2 className="animate-spin" /></div>}>
                        <EnrollmentForm />
                    </Suspense>
                </div>
            </div>

            <Footer />
        </main>
    )
}
