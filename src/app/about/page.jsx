'use client'

import React from "react";
import { User } from 'lucide-react';

export default function AboutPage() {
    return (
        <section className="pt-32 pb-20 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-full mb-8">
                        <User className="w-4 h-4 text-cyan-400" />
                        <span className="text-sm text-slate-300">Get to know me</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-12">
                        <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                            About Me
                        </span>
                    </h1>

                    <div className="space-y-6 text-lg text-slate-300 leading-relaxed mb-16">
                        <p className="text-xl text-slate-400">
                            I'm a full-stack developer and a Software Engineering student who would rather wrestle with a linker
                            error than another JavaScript framework. My true passion lies in low-level and systems programming,
                            where I focus on building robust, high-performance, and efficient solutions.
                        </p>

                        <p>
                            I am proficient in the Java Spring ecosystem but have found my technical home in Rust, which
                            fuels my interest in memory management, compilers, and optimization. This systems-thinking
                            extends to embedded firmware development for ARM-based boards, electronics, and cybersecurity
                            projects.
                        </p>

                        <p>
                            I'm driven by a need to understand and optimize systems from the metal up, a mindset reflected in
                            my daily use of Linux <span className="text-slate-500">(I use Arch btw)</span> and my pursuit of complex problems where performance and
                            correctness are critical.
                        </p>

                        <div className="p-6 border-l-4 border-cyan-500 bg-slate-900/30 rounded-r-xl">
                            <p className="text-slate-300">
                                <span className="text-cyan-400 font-semibold">Goal:</span> I am seeking roles that challenge me to solve deep technical problems, far away from the frontend.
                            </p>
                        </div>
                    </div>

                    {/* Connect Section */}
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-purple-600/10 blur-3xl"></div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                Let's Connect
                            </h3>
                            <p className="text-slate-400 mb-6">
                                Interested in systems programming, embedded development, or just want to chat about Rust and Linux?
                            </p>

                            <div className="flex items-center gap-4">
                                <a href="https://github.com/Ikken9" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                    </svg>
                                    <span>GitHub</span>
                                </a>
                                <a href="https://linkedin.com/in/piero-saucedo" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-all">
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                                    </svg>
                                    <span>LinkedIn</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}