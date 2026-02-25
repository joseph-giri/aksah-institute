'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    Plus,
    Trash2,
    Search,
    LogOut,
    ShieldCheck,
    ShieldAlert,
    Loader2,
    ListFilter,
    Upload,
    Image as ImageIcon
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [loginError, setLoginError] = useState('')

    const [certificates, setCertificates] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')

    // New Certificate Form State
    const [isAdding, setIsAdding] = useState(false)
    const [newCert, setNewCert] = useState({
        cert_number: '',
        student_name: '',
        course_name: '',
        issue_date: new Date().toISOString().split('T')[0],
        is_valid: true
    })
    const [formError, setFormError] = useState('')
    const [formLoading, setFormLoading] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadProgress, setUploadProgress] = useState(0)

    useEffect(() => {
        const auth = sessionStorage.getItem('admin_auth')
        if (auth === 'true') {
            setIsAuthenticated(true)
            fetchCertificates()
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        // Simple demo password - in production use Supabase Auth
        if (password === 'aksah2026') {
            setIsAuthenticated(true)
            sessionStorage.setItem('admin_auth', 'true')
            fetchCertificates()
        } else {
            setLoginError('Invalid access code.')
        }
    }

    const handleLogout = () => {
        setIsAuthenticated(false)
        sessionStorage.removeItem('admin_auth')
    }

    const fetchCertificates = async () => {
        setLoading(true)
        const { data, error } = await supabase
            .from('certificates')
            .select('*')
            .order('created_at', { ascending: false })

        if (data) setCertificates(data)
        setLoading(false)
    }

    const handleAddCertificate = async (e) => {
        e.preventDefault()
        setFormLoading(true)
        setFormError('')

        try {
            // 1. Upload Image first if selected
            if (selectedFile) {
                const fileExt = selectedFile.name.split('.').pop()
                const fileName = `${newCert.cert_number}.${fileExt}`

                const { error: uploadError } = await supabase.storage
                    .from('certificates')
                    .upload(fileName, selectedFile, {
                        cacheControl: '3600',
                        upsert: true
                    })

                if (uploadError) throw new Error(`Image Upload Failed: ${uploadError.message}`)
            }

            // 2. Insert Database Record
            const { data, error } = await supabase
                .from('certificates')
                .insert([newCert])
                .select()

            if (error) throw error

            setCertificates([data[0], ...certificates])
            setIsAdding(false)
            setNewCert({
                cert_number: '',
                student_name: '',
                course_name: '',
                issue_date: new Date().toISOString().split('T')[0],
                is_valid: true
            })
            setSelectedFile(null)
        } catch (err) {
            setFormError(err.message)
        } finally {
            setFormLoading(false)
        }
    }

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this certificate?')) return

        const { error } = await supabase
            .from('certificates')
            .delete()
            .eq('id', id)

        if (!error) {
            setCertificates(certificates.filter(c => c.id !== id))
        }
    }

    const filteredCerts = certificates.filter(c =>
        c.student_name.toLowerCase().includes(search.toLowerCase()) ||
        c.cert_number.toLowerCase().includes(search.toLowerCase())
    )

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen">
                <Navbar />
                <div className="pt-40 pb-20 px-6 flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass p-10 rounded-[2rem] border border-border/50 max-w-md w-full shadow-2xl"
                    >
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShieldCheck size={32} className="text-primary" />
                        </div>
                        <h1 className="text-2xl font-bold text-center mb-2">Admin Access</h1>
                        <p className="text-center text-muted-foreground mb-8">Enter the secure access code to manage certificates.</p>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <input
                                type="password"
                                placeholder="Access Code"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-5 py-4 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                            />
                            {loginError && <p className="text-destructive text-sm font-medium">{loginError}</p>}
                            <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold hover:shadow-lg transition-all">
                                Enter Dashboard
                            </button>
                        </form>
                    </motion.div>
                </div>
                <Footer />
            </main>
        )
    }

    return (
        <main className="min-h-screen">
            <Navbar />

            <div className="pt-32 pb-20 px-6 lg:px-12 max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Admin Dashboard</h1>
                        <p className="text-muted-foreground flex items-center gap-2">
                            <LayoutDashboard size={18} /> Certificate Management System
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsAdding(true)}
                            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold flex items-center gap-2 hover:shadow-lg transition-all"
                        >
                            <Plus size={20} /> Issue Certificate
                        </button>
                        <button
                            onClick={handleLogout}
                            className="p-3 glass rounded-xl text-muted-foreground hover:text-destructive transition-colors"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>

                {/* Search & Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="md:col-span-2 relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                        <input
                            type="text"
                            placeholder="Search by student or certificate ID..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 rounded-2xl glass border border-border/50 focus:border-primary outline-none transition-all"
                        />
                    </div>
                    <div className="glass p-4 rounded-2xl border border-border/50 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                                <ShieldCheck className="text-primary" size={20} />
                            </div>
                            <span className="text-sm font-medium">Total Issued</span>
                        </div>
                        <span className="text-2xl font-bold">{certificates.length}</span>
                    </div>
                </div>

                {/* Table Content */}
                <div className="glass rounded-3xl border border-border/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-accent/50 border-b border-border/40">
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">ID / Student</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground">Course</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Date</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                    <th className="px-6 py-5 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border/20">
                                {loading ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4">
                                                <Loader2 className="animate-spin text-primary" size={40} />
                                                <span className="text-muted-foreground font-medium">Loading certificates...</span>
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredCerts.length === 0 ? (
                                    <tr>
                                        <td colSpan="5" className="px-6 py-20 text-center text-muted-foreground">
                                            No certificates found.
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCerts.map((cert) => (
                                        <tr key={cert.id} className="hover:bg-accent/10 transition-colors">
                                            <td className="px-6 py-6">
                                                <div className="font-mono text-xs text-primary mb-1">{cert.cert_number}</div>
                                                <div className="font-bold text-lg">{cert.student_name}</div>
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className="text-sm font-medium text-muted-foreground">{cert.course_name}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                <span className="text-sm">{new Date(cert.issue_date).toLocaleDateString()}</span>
                                            </td>
                                            <td className="px-6 py-6 text-center">
                                                {cert.is_valid ? (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-500 text-xs font-bold rounded-full">
                                                        <ShieldCheck size={14} /> Valid
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full">
                                                        <ShieldAlert size={14} /> Invalid
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button
                                                    onClick={() => handleDelete(cert.id)}
                                                    className="p-2.5 rounded-xl hover:bg-destructive/10 hover:text-destructive transition-colors text-muted-foreground"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Add Certificate Modal */}
            <AnimatePresence>
                {isAdding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsAdding(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="glass p-8 md:p-12 rounded-[2.5rem] border border-border/50 max-w-2xl w-full shadow-2xl relative z-10"
                        >
                            <h2 className="text-3xl font-bold mb-8">Issue New Certificate</h2>

                            <form onSubmit={handleAddCertificate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Certificate Number</label>
                                    <input
                                        required
                                        value={newCert.cert_number}
                                        onChange={(e) => setNewCert({ ...newCert, cert_number: e.target.value })}
                                        placeholder="AK-2026-X01"
                                        className="w-full px-5 py-3.5 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Student Name</label>
                                    <input
                                        required
                                        value={newCert.student_name}
                                        onChange={(e) => setNewCert({ ...newCert, student_name: e.target.value })}
                                        placeholder="John Doe"
                                        className="w-full px-5 py-3.5 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2 col-span-full">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Course Name</label>
                                    <input
                                        required
                                        value={newCert.course_name}
                                        onChange={(e) => setNewCert({ ...newCert, course_name: e.target.value })}
                                        placeholder="Full Stack Web Development"
                                        className="w-full px-5 py-3.5 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Issue Date</label>
                                    <input
                                        required
                                        type="date"
                                        value={newCert.issue_date}
                                        onChange={(e) => setNewCert({ ...newCert, issue_date: e.target.value })}
                                        className="w-full px-5 py-3.5 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Status</label>
                                    <select
                                        value={newCert.is_valid}
                                        onChange={(e) => setNewCert({ ...newCert, is_valid: e.target.value === 'true' })}
                                        className="w-full px-5 py-3.5 rounded-xl bg-background border border-border/50 focus:border-primary outline-none transition-all"
                                    >
                                        <option value="true">Valid</option>
                                        <option value="false">Invalid</option>
                                    </select>
                                </div>

                                <div className="space-y-4 col-span-full">
                                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Certificate Image (JPG/PNG)</label>
                                    <div className="relative group/upload">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => setSelectedFile(e.target.files[0])}
                                            className="absolute inset-0 opacity-0 cursor-pointer z-10"
                                        />
                                        <div className="glass border-2 border-dashed border-border/50 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 group-hover/upload:border-primary/50 transition-all bg-white/[0.02]">
                                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                                <Upload size={24} className="text-primary" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-bold">
                                                    {selectedFile ? selectedFile.name : 'Click or Drag to Upload Image'}
                                                </p>
                                                <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">
                                                    Will be saved as {newCert.cert_number || 'CERT_ID'}.jpg
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {formError && <p className="col-span-full text-destructive text-sm font-medium">{formError}</p>}

                                <div className="col-span-full flex gap-4 mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsAdding(false)}
                                        className="flex-1 py-4 glass rounded-xl font-bold hover:bg-accent transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={formLoading}
                                        className="flex-1 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:shadow-lg disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                                    >
                                        {formLoading ? <Loader2 className="animate-spin" size={20} /> : <ShieldCheck size={20} />}
                                        Confirm Issue
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    )
}
