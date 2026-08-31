import React from 'react';
import { Link } from 'react-router-dom';
import {
  Eye,
  Brain,
  BarChart3,
  Upload,
  ShieldCheck,
  ArrowRight,
  Activity,
  Stethoscope,
  Sparkles,
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';

const features = [
  {
    icon: Upload,
    title: 'Smart Eye Upload',
    description: 'Upload clear eye images quickly with guided checks for quality and image suitability.',
  },
  {
    icon: Brain,
    title: 'AI Cataract Analysis',
    description: 'Deep learning models identify cataract patterns using clinically relevant eye image features.',
  },
  {
    icon: BarChart3,
    title: 'Severity Insights',
    description: 'Receive a confidence-based cataract grade with an easy-to-read clinical summary.',
  },
];

const steps = [
  {
    number: '01',
    title: 'Capture or upload eye image',
    description: 'Choose a clear single-eye photograph with proper lighting and minimal glare.',
  },
  {
    number: '02',
    title: 'AI preprocesses and inspects',
    description: 'The system enhances quality, isolates the eye, and evaluates cataract indicators.',
  },
  {
    number: '03',
    title: 'Get screening result',
    description: 'Review the cataract grade, confidence score, and suggested next clinical action.',
  },
];

const stats = [
  { value: '94M', label: 'Affected globally' },
  { value: '3', label: 'Clinical grades' },
  { value: 'ResNet50', label: 'AI model' },
  { value: '99%', label: 'Image guidance' },
];

const eyeShowcase = [
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx5ivbBKHKC8J_3v5luYB3iKI8y2hFgWD8GJHg_6wG0YhkuZWbdFqFJiCq&s=10',
  'https://www.reviewofoptometry.com/CMSImagesContent/2021/11/RO/11242021-phone-camera.jpg',
  'https://cdn.prod.website-files.com/65fa94d9154ecc79d459fdd0/6626fe682f4ac5c58cd092d2_Shinagawa_Blog-Piece-Mockup_August-3-05.jpeg',
];

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-sky-950 to-blue-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(125,211,252,0.30),transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(56,189,248,0.18),transparent_35%)]" />
        <div className="absolute inset-0 opacity-10">
          <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="hero-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
                <circle cx="25" cy="25" r="1.3" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-pattern)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-28">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="max-w-xl">
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-sky-100 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5" />
                Cataract screening AI
              </div>

              <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl">
                Eye imaging for
                <span className="mt-2 block bg-gradient-to-r from-cyan-200 via-sky-100 to-white bg-clip-text text-transparent">
                  smarter cataract detection
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-sky-100">
                Upload a digital eye image and receive a fast, AI-assisted cataract assessment with clinical-grade screening guidance.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-sky-900 shadow-xl shadow-cyan-500/20 transition hover:-translate-y-0.5 hover:bg-sky-50"
                >
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#features"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/20 bg-white/5 px-7 py-4 text-base font-semibold text-white transition hover:bg-white/10"
                >
                  Learn More
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4 text-sm text-sky-100/90">
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2">
                  <ShieldCheck className="h-4 w-4 text-cyan-200" />
                  Quality-guided upload
                </div>
                <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2">
                  <Activity className="h-4 w-4 text-cyan-200" />
                  Real-time analysis
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-8 top-10 h-32 w-32 rounded-full bg-cyan-400/30 blur-3xl" />
              <div className="absolute -right-4 bottom-6 h-36 w-36 rounded-full bg-sky-300/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/10 p-3 shadow-[0_40px_100px_rgba(14,116,144,0.45)] backdrop-blur-md">
                <div className="rounded-[24px] bg-white p-4 shadow-2xl">
                  <div className="mb-4 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-rose-400" />
                      <div className="h-3 w-3 rounded-full bg-amber-400" />
                      <div className="h-3 w-3 rounded-full bg-emerald-400" />
                    </div>
                    <div className="text-xs font-medium text-slate-500">cataractscan.ai</div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-[1.1fr_0.9fr]">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
                      <img
                        src={eyeShowcase[0]}
                        alt="Eye close-up for cataract screening"
                        className="h-72 w-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div className="rounded-2xl bg-gradient-to-br from-rose-50 to-amber-50 p-4 ring-1 ring-rose-100">
                        
                        
                        <p className="mt-3 text-sm text-slate-600">High confidence result from AI screening.</p>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Stethoscope className="h-4 w-4 text-cyan-600" />
                            Clinical grade
                          </div>
                          <p className="mt-2 text-xs text-slate-500">Validated for accurate digital eye assessment.</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                            <Eye className="h-4 w-4 text-cyan-600" />
                            Lens visibility
                          </div>
                          <p className="mt-2 text-xs text-slate-500">Focused on single-eye image clarity and obstruction checks.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
              <Brain className="h-3.5 w-3.5" />
              Why it matters
            </div>
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Advanced AI for early cataract detection</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              Designed to help clinicians and patients identify cataract indicators quickly using well-captured eye images.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_28px_80px_rgba(14,116,144,0.12)]"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-100 to-sky-100 text-cyan-700">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="text-base leading-7 text-slate-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
              A streamlined workflow from eye image capture to cataract assessment.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute left-[58%] top-8 hidden h-0.5 w-[40%] bg-gradient-to-r from-cyan-200 to-sky-200 md:block" />
                )}
                <div className="rounded-[28px] border border-slate-200 bg-slate-50 p-6 text-center shadow-sm">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-600 to-cyan-500 text-xl font-black text-white shadow-lg shadow-sky-400/30">
                    {step.number}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                  <p className="text-base leading-7 text-slate-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-sky-700 to-cyan-600 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center text-white md:grid-cols-4 md:text-left">
            {stats.map((stat, index) => (
              <div key={index} className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
                <div className="text-3xl font-black sm:text-4xl">{stat.value}</div>
                <div className="mt-2 text-sm text-sky-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_30px_80px_rgba(15,23,42,0.08)] sm:p-12">
            <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                  <Eye className="h-3.5 w-3.5" />
                  Clinical guidance
                </div>
                <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Clear imaging leads to better screening outcomes</h2>
                <p className="mt-4 max-w-lg text-lg text-slate-600">
                  For the most accurate cataract detection, upload a single clear eye image with proper lighting and no direct flash glare.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {eyeShowcase.map((image, index) => (
                  <div key={index} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-sm">
                    <img src={image} alt="Eye sample illustration" className="h-32 w-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="rounded-[32px] bg-gradient-to-r from-sky-700 via-cyan-600 to-teal-500 p-10 shadow-[0_30px_80px_rgba(2,132,199,0.25)] sm:p-14">
            <h2 className="text-3xl font-bold text-white sm:text-4xl">Start your cataract screening journey today</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-sky-100">
              Detect early signs, improve clinical confidence, and support faster screening with AI-powered eye analysis.
            </p>
            <Link
              to="/register"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-4 text-base font-semibold text-sky-800 shadow-xl transition hover:-translate-y-0.5 hover:bg-sky-50"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 py-12 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-sky-600">
              <Eye className="h-5 w-5 text-white" />
            </div>
            <div className="text-xl font-bold">
              Cataract<span className="text-cyan-400">AI</span>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 sm:text-right">
            CataractAI — Final Year Research Project | Sabaragamuwa University of Sri Lanka
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
