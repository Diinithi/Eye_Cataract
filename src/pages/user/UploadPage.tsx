import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Upload, Eye, X, CheckCircle, AlertCircle, Brain, ShieldCheck, Camera, ImageIcon, Sparkles, Check, CircleAlert } from 'lucide-react';
import toast from 'react-hot-toast';
import { imageAPI, predictionAPI } from '../../api/client';
import { Navbar } from '../../components/layout/Navbar';

type EyeSide = 'Left' | 'Right' | 'Not specified';
type Sex = 'Male' | 'Female' | 'Prefer not to say';

interface PreprocessingStep {
  label: string;
  completed: boolean;
}

const initialPreprocessingSteps: PreprocessingStep[] = [
  { label: 'Image loaded', completed: false },
  { label: 'Resizing to 224x224', completed: false },
  { label: 'CLAHE contrast enhancement', completed: false },
  { label: 'Normalising pixel values', completed: false },
  { label: 'Ready for analysis', completed: false },
];

const instructionCards = [
  {
    title: 'Upload a human eye image',
    detail: 'Use a clear, front-facing eye photograph from a real patient or a high-quality reference image.',
    icon: Eye,
    tone: 'bg-emerald-50 text-emerald-700',
  },
  {
    title: 'One eye only',
    detail: 'Keep the frame focused on a single eye, without extra face, both eyes, or unnecessary background.',
    icon: ImageIcon,
    tone: 'bg-sky-50 text-sky-700',
  },
  {
    title: 'Avoid direct flash',
    detail: 'Ensure the flash or light does not reflect directly onto the eye to prevent glare or washed-out details.',
    icon: Camera,
    tone: 'bg-amber-50 text-amber-700',
  },
  {
    title: 'Use a clear, high-quality image',
    detail: 'Choose an in-focus image with good lighting and visible iris, pupil, and surrounding eye structure.',
    icon: ShieldCheck,
    tone: 'bg-violet-50 text-violet-700',
  },
  {
    title: 'Avoid blur or obstruction',
    detail: 'Ensure the eye is fully visible and not covered, blurred, distorted, or partially hidden.',
    icon: CircleAlert,
    tone: 'bg-rose-50 text-rose-700',
  },
];

const sampleExamples = [
  {
    label: 'Good example',
    image: 'https://sa1s3optim.patientpop.com/assets/images/provider/photos/2017468.jpg',
    desc: 'Single eye, sharp focus, natural lighting and visible detail.',
    good: true,
  },
  {
    label: 'Avoid example',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMdoby1RGueRy4qea0DziYsjtSN68vRn3zoPXRWb6ZRw&s=10',
    desc: 'Poor angle, harsh glare, blurred eye and unclear visibility.',
    good: false,
  },
];

export const UploadPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [uploadWarning, setUploadWarning] = useState<string | null>(null);
  const [preprocessingSteps, setPreprocessingSteps] = useState<PreprocessingStep[]>(initialPreprocessingSteps);
  const [showPreprocessing, setShowPreprocessing] = useState(false);

  const [age, setAge] = useState('');
  const [sex, setSex] = useState<Sex>('Prefer not to say');
  const [eyeSide, setEyeSide] = useState<EyeSide>('Not specified');
  const [notes, setNotes] = useState('');

  const validateFile = (file: File): Promise<boolean> =>
    new Promise((resolve) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
      const maxSize = 5 * 1024 * 1024;

      if (!validTypes.includes(file.type)) {
        setUploadWarning('Please upload a JPG or PNG image of the eye.');
        toast.error('Please upload a JPG or PNG image');
        resolve(false);
        return;
      }

      if (file.size > maxSize) {
        setUploadWarning('The image is too large. Please choose a file under 5MB and ensure it is clear.');
        toast.error('Image must be smaller than 5MB');
        resolve(false);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      const image = new Image();

      image.onload = () => {
        URL.revokeObjectURL(objectUrl);

        if (image.width < 500 || image.height < 500) {
          setUploadWarning('Please upload a higher-resolution image so the eye remains clear and fully visible.');
          toast.error('Image is too small. Please choose a sharper, higher-resolution eye photo.');
          resolve(false);
          return;
        }

        setUploadWarning(null);
        resolve(true);
      };

      image.onerror = () => {
        URL.revokeObjectURL(objectUrl);
        setUploadWarning('The uploaded file could not be read. Please choose a valid eye image.');
        toast.error('The file could not be processed. Please try a different image.');
        resolve(false);
      };

      image.src = objectUrl;
    });

  const handleFileSelect = useCallback(async (file: File) => {
    const isValid = await validateFile(file);
    if (!isValid) return;

    setSelectedFile(file);
    setPreviewUrl((prevUrl) => {
      if (prevUrl) URL.revokeObjectURL(prevUrl);
      return URL.createObjectURL(file);
    });
    setPreprocessingSteps(initialPreprocessingSteps);
    setShowPreprocessing(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  }, [handleFileSelect]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const removeImage = () => {
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setUploadWarning(null);
    setShowPreprocessing(false);
    setPreprocessingSteps(initialPreprocessingSteps);
  };

  useEffect(() => {
    if (showPreprocessing && previewUrl) {
      const animateSteps = async () => {
        for (let i = 0; i < preprocessingSteps.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 450));
          setPreprocessingSteps((prev) => {
            const newSteps = [...prev];
            newSteps[i] = { ...newSteps[i], completed: true };
            return newSteps;
          });
        }
      };
      animateSteps();
    }
  }, [showPreprocessing, previewUrl]);

  const handleAnalyze = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }

    setIsAnalyzing(true);

    try {
      const uploadResponse = await imageAPI.upload(selectedFile);
      const uploadedImage = uploadResponse.data?.data;

      if (!uploadedImage) {
        throw new Error(uploadResponse.data?.message || 'Upload failed');
      }

      const predictionResponse = await predictionAPI.predict({
        imageId: uploadedImage.id,
        age: age ? parseInt(age) : undefined,
        sex: sex !== 'Prefer not to say' ? sex : undefined,
        eyeSide: eyeSide !== 'Not specified' ? eyeSide : undefined,
        notes: notes || undefined,
      });

      const prediction = predictionResponse.data?.data;
      if (!prediction) {
        throw new Error(predictionResponse.data?.message || 'Prediction failed');
      }

      toast.success('Analysis complete!');
      navigate(`/results/${prediction.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.detail || error.response?.data?.message || error.message || 'Analysis failed. Please try again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="min-h-screen bg-[#edf4f8]">
      <Navbar />

      {isAnalyzing && (
        <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="text-center">
            <Brain className="h-16 w-16 text-primary-500 mx-auto mb-4 animate-pulse" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Analyzing your eye image...</h2>
            <p className="text-slate-600 mb-6">Running cataract screening model</p>
            <div className="flex items-center justify-center gap-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="h-2.5 w-2.5 bg-primary-500 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-col gap-2">
            <div className="inline-flex items-center gap-2 w-fit rounded-full bg-[#eaf4ff] border border-[#cfe3f5] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#1e5f9d]">
              <Sparkles className="h-3.5 w-3.5" />
              Eye imaging
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-[-0.04em] text-slate-900">Upload Eye Image</h1>
            <p className="text-slate-600 max-w-2xl text-base md:text-lg">Upload a clear, high-quality eye image for cataract assessment and AI-based screening.</p>
          </div>

          <Link
            to="/history"
            className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-sky-200 hover:text-sky-700"
          >
            View History
          </Link>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <div
                className={`relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-200 ${isDragging ? 'border-primary-500 bg-primary-50 scale-[1.01]' : 'border-slate-300 bg-slate-50'} ${previewUrl ? 'p-0' : 'p-8 md:p-10'}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Uploaded eye preview"
                      className="h-[380px] w-full bg-slate-100 object-contain"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-slate-700 shadow-lg transition hover:bg-white"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <input
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleInputChange}
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-sky-100 text-primary-600 shadow-inner">
                      <Upload className="h-8 w-8" />
                    </div>
                    <p className="text-xl font-semibold text-slate-800">Upload Eye Image</p>
                    <p className="mt-2 text-sm text-slate-500">Drag and drop an image here or click to browse</p>
                    <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-500">
                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">JPG</span>
                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">PNG</span>
                      <span className="rounded-full bg-white px-3 py-1.5 shadow-sm ring-1 ring-slate-200">Max 5MB</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {uploadWarning && (
              <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-amber-800 shadow-sm">
                <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Image guidance warning</p>
                  <p className="text-sm">{uploadWarning}</p>
                </div>
              </div>
            )}

            {selectedFile && (
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-slate-900">{selectedFile.name}</p>
                    <p className="text-sm text-slate-500">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald-700">
                    {selectedFile.type.split('/')[1]?.toUpperCase() || 'IMAGE'}
                  </span>
                </div>
              </div>
            )}

            {showPreprocessing && (
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <h3 className="font-semibold text-slate-900">Image preprocessing</h3>
                </div>
                <div className="space-y-3">
                  {preprocessingSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 rounded-xl p-2 transition-all duration-300 ${
                        step.completed ? 'bg-emerald-50/60' : 'bg-slate-50'
                      }`}
                    >
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full ${step.completed ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                        {step.completed ? <Check className="h-3.5 w-3.5 text-white" /> : null}
                      </div>
                      <span className={`text-sm ${step.completed ? 'text-slate-800' : 'text-slate-500'}`}>
                        {step.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
              <h3 className="mb-4 text-lg font-semibold text-slate-900">Reference examples</h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {sampleExamples.map((example) => (
                  <div key={example.label} className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                    <div className="relative">
                      <img src={example.image} alt={example.label} className="h-32 w-full object-cover" />
                      <div className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${example.good ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'}`}>
                        {example.good ? 'Good' : 'Avoid'}
                      </div>
                    </div>
                    <div className="p-3">
                      <p className="font-medium text-slate-800">{example.label}</p>
                      <p className="mt-1 text-sm text-slate-600">{example.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="guideline-panel rounded-[28px] border border-[#d8e6f1] bg-[linear-gradient(180deg,#f9fbff_0%,#edf5fb_100%)] p-5 shadow-[0_18px_40px_rgba(15,23,42,0.04)]">
              <div className="mb-4 rounded-2xl border border-[#d9eaf6] bg-[linear-gradient(135deg,#edf6ff_0%,#e7f2ff_100%)] p-3">
                <div className="flex items-center gap-3">
                  <div className="guideline-icon flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#2f7db6] shadow-sm ring-1 ring-[#dfeaf7]">
                    <Eye className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="text-[15px] font-bold uppercase tracking-[0.18em] text-slate-700">Image requirements</h2>
                    <p className="text-sm text-slate-600">Use the best possible eye photo for accurate screening.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {instructionCards.map(({ title, detail, icon: Icon, tone }, index) => (
                  <div
                    key={title}
                    className="guideline-card group flex gap-3 rounded-2xl border border-[#d7e6f3] bg-[linear-gradient(135deg,#edf5fb_0%,#f6fbff_100%)] p-3.5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_20px_rgba(59,130,246,0.08)]"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className={`guideline-icon flex h-10 w-10 items-center justify-center rounded-xl ${tone} ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold text-slate-800">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-slate-900">Patient Details</h2>
            <p className="text-sm text-slate-500">Optional fields to improve prediction context.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Enter age"
                min="1"
                max="120"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as Sex)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="mb-3 block text-sm font-medium text-slate-700">Eye Side</label>
              <div className="grid sm:grid-cols-3 gap-3">
                {(['Left', 'Right', 'Not specified'] as EyeSide[]).map((side) => (
                  <button
                    key={side}
                    type="button"
                    onClick={() => setEyeSide(side)}
                    className={`flex items-center justify-center gap-2 rounded-xl border py-3 px-4 text-sm font-medium transition-all ${
                      eyeSide === side
                        ? 'border-primary-500 bg-primary-50 text-primary-700 shadow-sm'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-white'
                    }`}
                  >
                    <Eye className="h-4 w-4" />
                    {side}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Notes
                <span className="text-slate-400 font-normal"> (optional)</span>
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value.slice(0, 200))}
                placeholder="Any additional notes about the scan or patient condition..."
                rows={3}
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100"
              />
              <p className="mt-1 text-right text-xs text-slate-400">{notes.length}/200</p>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedFile || isAnalyzing}
            className={`mt-6 flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-lg font-semibold transition-all ${
              selectedFile && !isAnalyzing
                ? 'bg-gradient-to-r from-primary-500 to-cyan-500 text-white shadow-lg shadow-primary-500/20 hover:from-primary-600 hover:to-cyan-600'
                : 'cursor-not-allowed bg-slate-200 text-slate-400'
            }`}
          >
            <Brain className="h-5 w-5" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Eye Image'}
          </button>

          <p className="mt-3 text-center text-xs text-slate-500">Processing takes around 2-5 seconds and keeps your data private.</p>
        </div>
      </main>
    </div>
  );
};

export default UploadPage;
