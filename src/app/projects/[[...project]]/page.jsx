import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
    ArrowLeft,
    Tag,
    FileText,
    Clock,
    User,
    ChevronRight,
    Folder
} from 'lucide-react'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import rehypePrism from 'rehype-prism-plus'
import MDXImage from "@/components/MDXImage";

/* -------------------------------
   MDX Components with Modern Styling
-------------------------------- */
const components = {
    MDXImage,
    h1: (props) => (
        <h1
            className="text-5xl font-bold mb-8 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent border-b border-slate-800/50 pb-6"
            {...props}
        />
    ),
    h2: (props) => (
        <h2 className="text-4xl font-bold mb-4 mt-12 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent" {...props} />
    ),
    h3: (props) => (
        <h3 className="text-3xl font-bold mb-3 mt-10 text-white" {...props} />
    ),
    h4: (props) => (
        <h4 className="text-2xl font-bold mb-2 mt-8 text-slate-300" {...props} />
    ),
    p: (props) => (
        <p className="mb-6 text-slate-300 leading-relaxed text-lg" {...props} />
    ),
    ul: (props) => (
        <ul className="list-disc list-inside mb-6 text-slate-300 space-y-2 pl-4" {...props} />
    ),
    ol: (props) => (
        <ol className="list-decimal list-inside mb-6 text-slate-300 space-y-2 pl-4" {...props} />
    ),
    li: (props) => <li className="ml-4" {...props} />,
    code: ({ className, children, ...props }) => {
        const isInline = !className;

        if (isInline) {
            return (
                <code
                    className="bg-slate-800/50 border border-slate-700/50 px-2 py-1 text-sm text-cyan-400 rounded"
                    {...props}
                >
                    {children}
                </code>
            );
        }

        return (
            <code className={className} {...props}>
                {children}
            </code>
        );
    },
    pre: (props) => (
        <pre className="bg-slate-900/50 border border-slate-800/50 p-6 overflow-x-auto mb-8 text-sm rounded-xl" {...props} />
    ),
    blockquote: (props) => (
        <blockquote
            className="border-l-4 border-cyan-500 pl-6 italic text-slate-400 my-6 bg-slate-900/30 py-4 rounded-r-xl"
            {...props}
        />
    ),
    a: (props) => (
        <a
            className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            {...props}
        />
    ),
    img: (props) => (
        <img
            className="border border-slate-800/50 rounded-xl max-w-full h-auto my-6"
            {...props}
        />
    ),
    table: (props) => (
        <div className="overflow-x-auto mb-8">
            <table
                className="min-w-full border border-slate-800/50 rounded-xl overflow-hidden"
                {...props}
            />
        </div>
    ),
    thead: (props) => (
        <thead className="bg-slate-900/50 text-cyan-400" {...props} />
    ),
    tbody: (props) => <tbody {...props} />,
    tr: (props) => (
        <tr className="hover:bg-slate-900/30 transition-colors border-b border-slate-800/30" {...props} />
    ),
    th: (props) => (
        <th
            className="border-r border-slate-800/30 bg-slate-900/80 px-6 py-4 text-left text-cyan-400 font-semibold"
            {...props}
        />
    ),
    td: (props) => (
        <td
            className="border-r border-slate-800/30 px-6 py-4 text-slate-300"
            {...props}
        />
    ),
    hr: (props) => (
        <hr className="my-8 border-slate-800/50" {...props} />
    ),
    strong: (props) => (
        <strong className="font-bold text-white" {...props} />
    ),
    em: (props) => (
        <em className="italic text-slate-300" {...props} />
    ),
}

/* -------------------------------
   Helper Functions
-------------------------------- */
async function getMDXFiles() {
    const projectsDir = path.join(process.cwd(), 'projects')

    function readDirRecursively(dir, baseDir = '') {
        const files = []
        const items = fs.readdirSync(dir)

        for (const item of items) {
            const fullPath = path.join(dir, item)
            const relativePath = path.join(baseDir, item)

            if (fs.statSync(fullPath).isDirectory()) {
                files.push(...readDirRecursively(fullPath, relativePath))
            } else if (item.endsWith('.md') || item.endsWith('.mdx')) {
                const content = fs.readFileSync(fullPath, 'utf8')
                const stats = fs.statSync(fullPath)

                // Extract frontmatter
                const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/)
                let metadata = {}

                if (frontmatterMatch) {
                    const frontmatter = frontmatterMatch[1]
                    frontmatter.split('\n').forEach(line => {
                        const [key, ...valueParts] = line.split(':')
                        if (key && valueParts.length) {
                            const value = valueParts
                                .join(':')
                                .trim()
                                .replace(/^['"]|['"]$/g, '')
                            metadata[key.trim()] = value
                        }
                    })
                }

                // Extract title if not in frontmatter
                if (!metadata.title) {
                    const titleMatch = content.match(/^#\s+(.+)$/m)
                    metadata.title = titleMatch
                        ? titleMatch[1]
                        : item.replace(/\.(md|mdx)$/, '')
                }

                files.push({
                    name: item,
                    path: relativePath.replace(/\.(md|mdx)$/, ''),
                    fullPath: relativePath,
                    category: baseDir || 'root',
                    metadata,
                    lastModified: stats.mtime,
                    size: stats.size
                })
            }
        }

        return files
    }

    try {
        return readDirRecursively(projectsDir)
    } catch (error) {
        console.error('Error reading projects directory:', error)
        return []
    }
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

async function getMDXContent(mdxPath) {
    const projectsDir = path.join(process.cwd(), 'projects')
    const fullPath = path.join(projectsDir, `${mdxPath}.mdx`)
    const mdPath = path.join(projectsDir, `${mdxPath}.md`)

    let filePath = null
    if (fs.existsSync(fullPath)) filePath = fullPath
    else if (fs.existsSync(mdPath)) filePath = mdPath
    else return null

    try {
        const source = fs.readFileSync(filePath, 'utf8')
        const stats = fs.statSync(filePath)

        // Compile MDX
        const { content, frontmatter } = await compileMDX({
            source,
            components,
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    remarkPlugins: [remarkGfm],
                    rehypePlugins: [rehypePrism],
                },
            },
        })

        // Calculate read time
        const wordsPerMinute = 200
        const words = source.split(/\s+/).length
        const readTime = Math.ceil(words / wordsPerMinute)

        return {
            content,
            frontmatter: frontmatter || {},
            stats,
            filePath,
            readTime,
            wordCount: words
        }
    } catch (err) {
        console.error('Error reading MDX:', err)
        return null
    }
}

/* -------------------------------
   Main Page Component
-------------------------------- */
export default async function ProjectsPage({ params }) {
    const { project } = params
    const pathString = project?.length ? project.join('/') : ''

    if (!pathString) {
        const files = await getMDXFiles()
        const categories = [...new Set(files.map(f => f.category))]

        return (
            <div className="min-h-screen text-white pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h1>

                        <div className="flex items-center gap-4 text-slate-400 mb-8">
                            <span>{files.length} documents</span>
                            <span>•</span>
                            <span>{categories.length} categories</span>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-2xl">
                            <div className="text-3xl font-bold text-cyan-400 mb-2">{files.length}</div>
                            <div className="text-slate-400">Total Files</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-2xl">
                            <div className="text-3xl font-bold text-purple-400 mb-2">{categories.length}</div>
                            <div className="text-slate-400">Categories</div>
                        </div>
                        <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-2xl">
                            <div className="text-3xl font-bold text-pink-400 mb-2">
                                {formatFileSize(files.reduce((acc, f) => acc + f.size, 0))}
                            </div>
                            <div className="text-slate-400">Total Size</div>
                        </div>
                    </div>

                    {/* File Listings by Category */}
                    {categories.map(category => (
                        <div key={category} className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Folder className="w-6 h-6 text-cyan-400" />
                                <h2 className="text-3xl font-bold text-white">
                                    {category === 'root' ? 'projects' : `projects/${category}`}
                                </h2>
                                <span className="text-slate-500">
                                    ({files.filter(f => f.category === category).length})
                                </span>
                            </div>

                            <div className="space-y-3">
                                {files
                                    .filter(f => f.category === category)
                                    .sort((a, b) => b.idx - a.idx)
                                    .map(file => (
                                        <Link
                                            key={file.path}
                                            href={`/projects/${file.path}`}
                                            className="block p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-xl hover:border-cyan-500/50 transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <FileText className="w-5 h-5 text-cyan-400" />
                                                        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                                                            {file.metadata.title || file.name}
                                                        </h3>
                                                    </div>
                                                    {file.metadata.description && (
                                                        <p className="text-slate-400 mb-2 line-clamp-2">
                                                            {file.metadata.description}
                                                        </p>
                                                    )}
                                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                                        <span>{formatFileSize(file.size)}</span>
                                                    </div>
                                                </div>
                                                <ChevronRight className="w-6 h-6 text-slate-600 group-hover:text-cyan-400 transition-colors flex-shrink-0 ml-4" />
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    }

    // DOCUMENT PAGE - Show single doc
    const mdxData = await getMDXContent(pathString)
    if (!mdxData) notFound()

    const { content, frontmatter, stats, readTime, wordCount } = mdxData

    return (
        <div className="min-h-screen text-white pt-32 pb-20">
            <div className="max-w-5xl mx-auto px-6">
                {/* Back Button */}
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg hover:bg-slate-800 transition-all mb-8 group"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Back to projects</span>
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="mb-8">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                                {frontmatter.title || 'Untitled'}
                            </span>
                        </h1>

                        {frontmatter.description && (
                            <p className="text-xl text-slate-400 mb-6 leading-relaxed">
                                {frontmatter.description}
                            </p>
                        )}

                        <div className="grid grid-flow-col auto-cols-max gap-4 text-sm">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400">
                                <Clock className="w-4 h-4" />
                                <span>{readTime} min read</span>
                            </div>

                            {frontmatter.author && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400">
                                    <User className="w-4 h-4" />
                                    <span>{frontmatter.author}</span>
                                </div>
                            )}

                            {frontmatter.tags && (
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded-lg text-slate-400">
                                    <Tag className="w-4 h-4" />
                                    <div className="flex flex-wrap gap-2">
                                        {frontmatter.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center px-2 py-1 bg-slate-700/50 rounded-md text-sm"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>


                    </div>

                    <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent"></div>
                </div>

                {/* MDX Content */}
                <article className="prose prose-invert max-w-none">
                    {content}
                </article>

                {/* Footer Info Card */}
                <div className="mt-16 pt-8 border-t border-slate-800/50">
                    <div className="p-6 bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-800/50 rounded-xl">
                        <h3 className="text-lg font-semibold text-cyan-400 mb-4">Document Information</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-slate-500">Size:</span>
                                <div className="text-slate-300 mt-1">{formatFileSize(stats.size)}</div>
                            </div>
                            <div>
                                <span className="text-slate-500">Words:</span>
                                <div className="text-slate-300 mt-1">~{wordCount}</div>
                            </div>
                            <div>
                                <span className="text-slate-500">Reading time:</span>
                                <div className="text-slate-300 mt-1">{readTime} minutes</div>
                            </div>
                            <div>
                                <span className="text-slate-500">Last modified:</span>
                                <div className="text-slate-300 mt-1">{stats.mtime.toLocaleDateString()}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export async function generateStaticParams() {
    const baseDir = path.join(process.cwd(), 'projects')

    // Recursively walk through `projects/` to get all .mdx files
    function walk(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true })
        let paths = []

        for (const entry of entries) {
            const fullPath = path.join(dir, entry.name)
            if (entry.isDirectory()) {
                paths = paths.concat(walk(fullPath))
            } else if (entry.name.endsWith('.mdx')) {
                const relPath = path
                    .relative(baseDir, fullPath)
                    .replace(/\.mdx$/, '')
                    .split(path.sep)
                paths.push({ project: relPath })
            }
        }

        return paths
    }

    const allPaths = walk(baseDir)
    return [{ project: [] }, ...allPaths]
}