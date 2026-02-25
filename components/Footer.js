import Link from 'next/link'
import { Linkedin, Twitter, Github, Mail } from 'lucide-react'

export default function Footer() {
    return (
        <footer className="py-20 px-6 border-t border-border/40 bg-background">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-2">
                    <Link href="/" className="flex items-center gap-3 mb-6">
                        <img src="/images/logo.png" alt="Aksah Logo" className="w-10 h-10 object-contain" />
                        <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#fbbf24]">
                            AKSAH
                        </span>
                    </Link>
                    <p className="text-muted-foreground mb-8 max-w-sm">
                        Professional IT training center in Charikot, Dolakha. Empowering students since 2072 with practical knowledge.
                    </p>
                    <div className="space-y-3 text-sm text-muted-foreground mb-8">
                        <p className="flex items-center gap-2 italic">Charikot, Dolakha, Nepal</p>
                        <p className="flex items-center gap-2">+977 1-4XXXXXX | contact@aksah.edu.np</p>
                    </div>
                    <div className="flex gap-4">
                        <Link href="#" className="p-3 rounded-xl glass hover:text-primary transition-colors"><Twitter size={20} /></Link>
                        <Link href="#" className="p-3 rounded-xl glass hover:text-primary transition-colors"><Linkedin size={20} /></Link>
                        <Link href="#" className="p-3 rounded-xl glass hover:text-primary transition-colors"><Github size={20} /></Link>
                        <Link href="#" className="p-3 rounded-xl glass hover:text-primary transition-colors"><Mail size={20} /></Link>
                    </div>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Quick Links</h4>
                    <ul className="space-y-4">
                        <li><Link href="#courses" className="text-muted-foreground hover:text-primary transition-colors">Courses</Link></li>
                        <li><Link href="#verify" className="text-muted-foreground hover:text-primary transition-colors">Verify Certificate</Link></li>
                        <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6">Support</h4>
                    <ul className="space-y-4">
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms of Service</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Help Center</Link></li>
                        <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Student Portal</Link></li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
                © 2026 Aksah Computer Institute. All rights reserved. Designed for the Future.
            </div>
        </footer >
    )
}
