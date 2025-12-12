'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ChevronDown, Code, Zap, Palette, Layers, GitBranch, Terminal, Search } from 'lucide-react';

interface FaqItem {
  id: string;
  question: string;
  answer: string | React.ReactNode;
  keywords?: string[];
}

interface FaqSection {
  title: string;
  icon: React.ReactNode;
  items: FaqItem[];
}

const FAQ_DATA: FaqSection[] = [
  {
    title: 'Design System & Methodology',
    icon: <Palette className="w-5 h-5 text-fuchsia-500" />,
    items: [
      {
        id: 'what_is_design_system',
        question: 'How do these components fit into my existing Design System?',
        answer: (
          <>
            Our components are designed to be <strong>primitive and flexible</strong>. They align with modern methodologies (like Atomic Design) and are easy to integrate into your existing token-based system. By overriding the Tailwind CSS theme variables, you can ensure our buttons, cards, and toggles perfectly match your brand's colors and typography.
          </>
        ),
        keywords: ['design system', 'tokens', 'branding', 'atomic', 'theme'],
      },
      {
        id: 'component_source',
        question: 'Are the components accessible (A11Y compliant)?',
        answer: (
          <>
            Yes. Accessibility is a core focus. All interactive components include necessary <strong>ARIA attributes</strong> (e.g., <code>aria-pressed</code>), correct keyboard navigation, semantic HTML, and pass WCAG 2.1 AA contrast checks.
          </>
        ),
        keywords: ['accessibility', 'a11y', 'wcag', 'aria', 'keyboard'],
      },
      {
        id: 'updating_instances',
        question: 'If I update a master component in the builder, are all instances updated?',
        answer: (
          <>
            When you copy code, you get a static snapshot. For live updates across projects, we recommend publishing components as an <strong>npm package</strong> or using a monorepo (e.g., Turborepo). This enables versioned updates with one command.
          </>
        ),
        keywords: ['instances', 'update', 'library', 'npm', 'package'],
      },
    ],
  },
  {
    title: 'Code Integration & Dependencies',
    icon: <Code className="w-5 h-5 text-indigo-500" />,
    items: [
      {
        id: 'install_code',
        question: 'I copied the code, but the dependencies are missing. What should I install?',
        answer: (
          <>
            Most advanced components require:
            <pre className="mt-3 bg-gray-100 dark:bg-gray-800 p-3 rounded-lg text-sm font-mono overflow-x-auto">
              npm install framer-motion lucide-react
            </pre>
            Optional: <code>clsx</code> or <code>tailwind-merge</code> for cleaner class handling.
          </>
        ),
        keywords: ['dependencies', 'install', 'framer motion', 'lucide', 'npm'],
      },
      {
        id: 'state_handling',
        question: 'How do I manage the state (e.g., "loading" or "on") from my parent component?',
        answer: (
          <>
            All interactive components are <strong>fully controllable</strong>. Use props like:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><code>isOn</code> / <code>setIsOn</code> for toggles</li>
              <li><code>isLoading</code> for buttons</li>
              <li><code>onChange</code> / <code>onToggle</code> callbacks</li>
            </ul>
          </>
        ),
        keywords: ['state', 'controlled', 'parent', 'props', 'onChange'],
      },
      {
        id: 'framework_compatibility',
        question: 'Can I use your React components directly in a Vue or Angular project?',
        answer: (
          <>
            No — JSX and React hooks are React-specific. However, the <strong>HTML structure, CSS, and design patterns</strong> are framework-agnostic and can be ported to Vue, Svelte, Solid.js, etc., with minor adaptations.
          </>
        ),
        keywords: ['vue', 'angular', 'svelte', 'framework', 'port'],
      },
    ],
  },
  {
    title: 'Troubleshooting & Fixing Bugs',
    icon: <Terminal className="w-5 h-5 text-green-500" />,
    items: [
      {
        id: 'darkmode_fix',
        question: 'Why are the `dark:` utility classes not working?',
        answer: (
          <>
            Common causes:
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li><code>darkMode: class</code> in <code>tailwind.config.js</code> → add <code>class=dark</code> to <code>&lt;html&gt;</code></li>
              <li>Or use <code>darkMode: media</code> for OS preference</li>
              <li>Ensure <code>@tailwindcss/dark-mode</code> is not required (Tailwind v3+ has it built-in)</li>
            </ol>
          </>
        ),
        keywords: ['dark mode', 'dark:', 'tailwind', 'class', 'media'],
      },
      {
        id: 'animation_fix',
        question: 'Animations (like the 3D flip) are choppy or laggy.',
        answer: (
          <>
            Fix performance with:
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use <code>will-change: transform</code> or <code>transform: translateZ(0)</code></li>
              <li>Avoid animating <code>height</code> or <code>opacity</code> alone — prefer <code>transform</code> + <code>opacity</code></li>
              <li>Enable GPU acceleration in Framer Motion: <code>layout</code> prop or <code>&lt;motion.div layout /&gt;</code></li>
            </ul>
          </>
        ),
        keywords: ['animation', 'laggy', 'choppy', 'framer', 'gpu'],
      },
    ],
  },
];

// Accordion Item with smooth height animation
const AccordionItem: React.FC<{
  item: FaqItem;
  isOpen: boolean;
  toggle: (id: string) => void;
}> = React.memo(({ item, isOpen, toggle }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm overflow-hidden bg-white dark:bg-gray-800 transition-all duration-200 hover:shadow-lg">
      <button
        className="w-full flex justify-between items-center p-5 text-left text-lg font-semibold text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-50 dark:focus-visible:ring-offset-gray-900 rounded-xl"
        onClick={() => toggle(item.id)}
        aria-expanded={isOpen}
        aria-controls={`faq-${item.id}`}
      >
        <span>{item.question}</span>
        <ChevronDown
          className={`w-6 h-6 text-indigo-500 transition-transform duration-300 flex-shrink-0 ml-4 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ height: isOpen ? contentRef.current?.scrollHeight || 'auto' : 0 }}
      >
        <div
          ref={contentRef}
          id={`faq-${item.id}`}
          className="px-5 pb-5 pt-2 text-gray-600 dark:text-gray-300"
        >
          <div className="prose prose-sm dark:prose-invert max-w-none leading-relaxed">
            {item.answer}
          </div>
        </div>
      </div>
    </div>
  );
});
AccordionItem.displayName = 'AccordionItem';

export default function FaqPage() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleAnswer = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  // Filter FAQ items based on search
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return FAQ_DATA;

    const query = searchQuery.toLowerCase();
    return FAQ_DATA.map(section => ({
      ...section,
      items: section.items.filter(
        item =>
          item.question.toLowerCase().includes(query) ||
          (item.keywords && item.keywords.some(k => k.toLowerCase().includes(query)))
      ),
    })).filter(section => section.items.length > 0);
  }, [searchQuery]);

  // Focus search on /
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== document.querySelector('input[type="search"]')) {
        e.preventDefault();
        document.getElementById('faq-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <>
      <div className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-6xl">
              Developer FAQ
            </h1>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Everything you need to know about integrating and customizing our premium React components.
            </p>

            {/* Search Bar */}
            <div className="mt-8 relative max-w-3xl mx-auto">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                id="faq-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search questions... (press / to focus)"
                className="w-full pl-14 pr-4 py-4 border-2 border-indigo-200 dark:border-indigo-800 rounded-xl shadow-inner focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-all duration-200 outline-none text-lg"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && filteredSections.length === 0 && (
              <p className="mt-8 text-gray-500 dark:text-gray-400">No results found for {searchQuery}</p>
            )}
          </div>

          <div className="md:grid md:grid-cols-12 md:gap-12">
            {/* Sticky Sidebar Navigation */}
            <nav className="md:col-span-3 hidden md:block sticky top-20 space-y-8">
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider border-b border-gray-300 dark:border-gray-700 pb-3 mb-5">
                  Quick Navigation
                </p>
                <ul className="space-y-4">
                  {FAQ_DATA.map((section) => (
                    <li key={section.title}>
                      <a
                        href={`#${section.title.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-medium group"
                      >
                        <span className="group-hover:scale-110 transition-transform">
                          {section.icon}
                        </span>
                        <span>{section.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            {/* Main Content */}
            <div className="md:col-span-9 space-y-16">
              {filteredSections.map((section) => (
                <section
                  key={section.title}
                  id={section.title.toLowerCase().replace(/ /g, '-')}
                  className="scroll-mt-24"
                >
                  <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white flex items-center space-x-4 mb-8">
                    {section.icon}
                    <span>{section.title}</span>
                    <span className="ml-auto text-sm font-normal text-gray-500">
                      {section.items.length} {section.items.length === 1 ? 'question' : 'questions'}
                    </span>
                  </h2>

                  <div className="space-y-6">
                    {section.items.map((item) => (
                      <AccordionItem
                        key={item.id}
                        item={item}
                        isOpen={openId === item.id}
                        toggle={toggleAnswer}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

          {/* No Results State */}
          {searchQuery && filteredSections.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🤷‍♂️</div>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                No questions found matching <strong>{searchQuery}</strong>
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-4 text-indigo-600 hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}