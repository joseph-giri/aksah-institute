'use client'

import { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { CheckCircle2, XCircle, ShieldCheck, Calendar, User, BookOpen, ArrowLeft, Mail, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function VerifyPage({ params }) {
    const { id } = use(params)
    const [certificate, setCertificate] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        async function fetchCert() {
            setLoading(true)
            try {
                const { data, error } = await supabase
                    .from('certificates')
                    .select('*')
                    .eq('cert_number', id)
                    .maybeSingle()

                if (error) throw error
                setCertificate(data)
            } catch (err) {
                console.error('Error fetching certificate:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchCert()
    }, [id])

    const supabaseProjectUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://iiqgxdqdxidqohdjxcex.supabase.co'
    const certImageUrl = certificate
        ? `${supabaseProjectUrl}/storage/v1/object/public/certificates/${certificate.cert_number}.jpg`
        : null

    const handleDownload = async () => {
        try {
            const response = await fetch(certImageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${certificate.cert_number}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error('Download failed:', err);
            window.open(certImageUrl, '_blank');
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen bg-[#020617] text-white flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-primary" size={48} />
                        <p className="text-slate-400 font-bold tracking-widest uppercase text-xs">Decrypting Credentials...</p>
                    </div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen bg-[#020617] text-white">
            <Navbar />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 group">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
                    </Link>

                    {certificate ? (
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                            {/* Left Column: Visual Certificate */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="group glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl relative">
                                    <div className="aspect-[4/3] relative bg-slate-900 flex items-center justify-center p-4">
                                        <img
                                            src={certImageUrl}
                                            alt="Official Certificate"
                                            className="w-full h-full object-contain rounded-xl shadow-inner group-hover:scale-[1.02] transition-transform duration-700"
                                            onError={(e) => {
                                                e.target.src = "https://placehold.co/800x600/020617/ffffff?text=Certificate+Image+Pending";
                                            }}
                                        />

                                        {/* Verification Overlay */}
                                        <div className="absolute top-8 right-8 pointer-events-none">
                                            <div className="bg-emerald-500 text-white px-4 py-2 rounded-full font-black text-xs tracking-widest shadow-lg shadow-emerald-500/50 flex items-center gap-2 animate-pulse">
                                                <ShieldCheck size={14} /> VERIFIED
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-white/5 border-t border-white/5 flex items-center justify-between">
                                        <div className="text-xs font-bold tracking-widest text-slate-400 uppercase">Interactive Preview</div>
                                        <Link
                                            href={certImageUrl}
                                            target="_blank"
                                            className="text-xs font-black text-primary hover:underline uppercase tracking-widest"
                                        >
                                            View Full Resolution
                                        </Link>
                                    </div>
                                </div>

                                <div className="p-8 glass rounded-[2rem] border border-white/5 bg-white/[0.02]">
                                    <h3 className="text-sm font-black tracking-[0.3em] uppercase text-slate-500 mb-6 flex items-center gap-3">
                                        <div className="w-4 h-1 bg-primary rounded-full" /> Important Verification Notice
                                    </h3>
                                    <p className="text-sm text-slate-400 leading-relaxed font-medium">
                                        This document is an official digital representation of the physical certificate issued by Aksa Institute of Technology (AIT). All information is retrieved in real-time from our secure database, encrypted, and verified against international CTEVT standards.
                                    </p>
                                </div>
                            </div>

                            {/* Right Column: Detailed Transcript */}
                            <div className="lg:col-span-5 space-y-8">
                                <div className="p-10 glass rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden h-full">
                                    {/* Holographic Badge background */}
                                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

                                    <div className="flex items-center gap-4 mb-10 pb-8 border-b border-white/10">
                                        <img src="/images/logo.png" alt="AIT Logo" className="w-12 h-12" />
                                        <div>
                                            <h2 className="text-2xl font-black tracking-tight">Digital <span className="text-[#fbbf24]">Transcript</span></h2>
                                            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">AIT Global Accreditation</p>
                                        </div>
                                    </div>

                                    <div className="space-y-10">
                                        {/* Data Points */}
                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Student Identitiy</p>
                                            <h3 className="text-3xl font-bold">{certificate.student_name}</h3>
                                        </div>

                                        <div className="space-y-2">
                                            <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Course Completed</p>
                                            <h3 className="text-2xl font-bold italic">{certificate.course_name}</h3>
                                        </div>

                                        <div className="grid grid-cols-2 gap-8">
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Serial Number</p>
                                                <h3 className="text-xl font-mono font-bold tracking-tighter">{certificate.cert_number}</h3>
                                            </div>
                                            <div className="space-y-2">
                                                <p className="text-[10px] font-black tracking-[0.3em] uppercase text-primary">Issue Date</p>
                                                <h3 className="text-xl font-bold">
                                                    {new Date(certificate.issue_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="pt-8 border-t border-white/10">
                                            <div className="flex items-center justify-between mb-8">
                                                <div>
                                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 mb-1">Status</p>
                                                    <div className="flex items-center gap-2 text-emerald-400 font-black text-sm uppercase">
                                                        Authentic & Valid <CheckCircle2 size={16} />
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-slate-500 mb-1">Affiliation</p>
                                                    <div className="text-[10px] font-bold text-white/60">CTEVT Nepal Accredited</div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-4">
                                                <button
                                                    onClick={handleDownload}
                                                    className="py-4 bg-primary text-white rounded-2xl text-xs font-bold uppercase tracking-widest hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                                                >
                                                    Download Certificate
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 text-center py-20">
                            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-8 ring-4 ring-destructive/20">
                                <XCircle size={48} className="text-destructive" />
                            </div>
                            <h1 className="text-5xl font-black mb-4 tracking-tighter">Identity Not <span className="text-destructive">Recognized</span></h1>
                            <p className="text-slate-400 max-w-md mx-auto mb-12 font-medium">
                                The certificate ID <span className="text-white font-mono font-bold">"{id}"</span> does not match any official records. Please verify the ID or contact administration.
                            </p>

                            <Link
                                href="/contact"
                                className="bg-white/5 border border-white/10 px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-sm hover:bg-white/10 transition-all inline-flex items-center gap-3"
                            >
                                <Mail size={18} /> Request Re-verification
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            <Footer />
        </main>
    )
}
