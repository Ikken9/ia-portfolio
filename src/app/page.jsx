'use client'

import React, { useState, useEffect } from 'react';
import { ArrowRight, Code2, ExternalLink, Github, Linkedin, ChevronDown } from 'lucide-react';
import Link from "next/link";


const ModernMLPortfolio = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const projects = [
        {
            title: "Titanic EDA",
            description: "Comprehensive exploratory data analysis investigating survival factors of Titanic passengers with advanced statistical techniques.",
            tags: ["EDA", "Seaborn", "NumPy", "Matplotlib", "Pandas"],
            gradient: "from-cyan-500 to-blue-600",
        },
        {
            title: "Feature Engineering",
            description: "Complete machine learning pipeline with feature engineering to predict passenger survival using logistic regression.",
            tags: ["Logistic Regression", "Classifier", "Scikit-learn", "Pandas"],
            gradient: "from-violet-500 to-purple-600",
        },
        {
            title: "Linear Regression",
            description: "Housing price prediction model using linear regression on the Boston Housing dataset with performance optimization.",
            tags: ["Linear Regression", "Scikit-learn", "Pandas", "Matplotlib"],
            gradient: "from-pink-500 to-rose-600",
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500/10 to-purple-600/10 border border-cyan-500/20 rounded-full mb-8">
                            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-slate-300">Machine Learning Portfolio</span>
                        </div>

                        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Transforming Data
              </span>
                            <br />
                            <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                Into Insights
              </span>
                        </h1>

                        <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed">
                            Exploring the foundations of machine learning through hands-on projects,
                            comprehensive analysis, and continuous learning
                        </p>

                        <div className="flex items-center justify-center gap-4">
                            <Link href="/projects" className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-purple-500/50 transition-all">
                                View Projects
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Scroll Indicator */}
                    <div className="flex justify-center mt-20">
                        <ChevronDown className="w-6 h-6 text-slate-500 animate-bounce" />
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-4">
                            <span className="text-sm text-purple-400">Featured Work</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Recent Projects
              </span>
                        </h2>
                        <p className="text-xl text-slate-400">
                            Hands-on machine learning projects exploring various algorithms and techniques
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((project, index) => (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveProject(index)}
                                onMouseLeave={() => setActiveProject(null)}
                                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/50 border border-slate-800/50 rounded-2xl p-8 hover:border-slate-700 transition-all duration-300 overflow-hidden cursor-pointer"
                            >
                                {/* Gradient overlay on hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-cyan-400 group-hover:to-purple-500 transition-all">
                                        {project.title}
                                    </h3>

                                    <p className="text-slate-400 mb-6 leading-relaxed">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-6">
                                        {project.tags.map((tag, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-slate-800/50 border border-slate-700/50 rounded-lg text-xs text-slate-300"
                                            >
                        {tag}
                      </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm">
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
                                            <Code2 className="w-4 h-4" />
                                            View Code
                                        </button>
                                        <button className="flex items-center gap-2 text-slate-400 hover:text-purple-400 transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                            Live Demo
                                        </button>
                                    </div>
                                    <div className="flex items-start justify-between mt-6">
                                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${project.gradient} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/projects" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-xl hover:bg-slate-800 transition-all group">
                            View All Projects
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-3xl p-12 md:p-16 overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/20 to-purple-600/20 blur-3xl"></div>

                        <div className="relative z-10 text-center">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  Let's Connect
                </span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
                                Interested in collaborating? Feel free to reach out!
                            </p>

                            <div className="flex items-center justify-center gap-4">
                                <a href="https://github.com/Ikken9" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all">
                                    <Github className="w-6 h-6" />
                                </a>
                                <a href="https://linkedin.com/in/piero-saucedo" target="_blank" rel="noopener noreferrer" className="p-4 bg-slate-800 border border-slate-700 rounded-xl hover:bg-slate-700 transition-all">
                                    <Linkedin className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ModernMLPortfolio;