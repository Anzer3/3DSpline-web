"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { acceptingInquiries, informativeNotice } from "@/lib/company";
import {
  UploadCloud,
  FileCheck2,
  Trash2,
  AlertCircle,
  Loader2,
  ArrowRight,
  FileBox,
  FileText,
  HelpCircle,
  Minus,
  Plus,
  Link2,
} from "lucide-react";

type InquiryTab = "model" | "drawing" | null;
type TooltipId = "prototype" | "description" | "dropzone-formats" | null;

interface UploadedFile {
  file: File;
  id: string;
  previewUrl?: string;
  originalSize?: number;
}

interface InquiryFormProps {
  defaultTab?: InquiryTab;
}

const IMAGE_COMPRESSION_THRESHOLD = 500 * 1024; // 500 KB
const MAX_IMAGE_DIMENSION = 2000;
const JPEG_QUALITY = 0.85;

async function compressImageIfNeeded(
  file: File
): Promise<{ file: File; originalSize?: number }> {
  const isCompressibleImage =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    /\.(jpg|jpeg|png)$/i.test(file.name);

  if (!isCompressibleImage || file.size <= IMAGE_COMPRESSION_THRESHOLD) {
    return { file };
  }

  return new Promise((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      URL.revokeObjectURL(objectUrl);

      let { width, height } = img;
      if (width > MAX_IMAGE_DIMENSION || height > MAX_IMAGE_DIMENSION) {
        if (width >= height) {
          height = Math.round((height * MAX_IMAGE_DIMENSION) / width);
          width = MAX_IMAGE_DIMENSION;
        } else {
          width = Math.round((width * MAX_IMAGE_DIMENSION) / height);
          height = MAX_IMAGE_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        resolve({ file });
        return;
      }

      // Fill white background in case of transparent PNG
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob || blob.size >= file.size) {
            resolve({ file });
            return;
          }

          const newName = file.name.replace(/\.(png|jpeg|jpg)$/i, ".jpg");
          const compressedFile = new File([blob], newName, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });

          resolve({
            file: compressedFile,
            originalSize: file.size,
          });
        },
        "image/jpeg",
        JPEG_QUALITY
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ file });
    };

    img.src = objectUrl;
  });
}

// Sdílené třídy vzhledu formuláře
const rowClass = "py-4 flex flex-col sm:flex-row sm:items-center gap-2.5 sm:gap-6";
const rowTopClass = "py-4 flex flex-col sm:flex-row sm:items-start gap-2.5 sm:gap-6";
const labelClass = "text-sm font-semibold text-slate-900 sm:w-40 shrink-0";
const inputClass =
  "px-3.5 py-2.5 rounded-md border border-slate-300 bg-white text-slate-900 text-sm placeholder-slate-400 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors";
const segmentClass =
  "inline-flex items-center gap-2 px-0.5 py-1.5 border-b-[3px] text-sm font-semibold transition-colors";
const segmentOnClass = "border-blue-600 text-slate-900";
// Hover jen na zařízeních s myší, aby na mobilu nezůstávalo „viset“ šedé podtržení po ťuknutí
const segmentOffClass =
  "border-transparent text-slate-500 [@media(hover:hover)]:hover:text-slate-900 [@media(hover:hover)]:hover:border-slate-300";
const tooltipClass =
  "pointer-events-none absolute mb-2 p-3 bg-slate-900 text-white text-xs rounded-md shadow-lg transition-opacity duration-200 z-30 leading-relaxed text-left font-normal";

function RequiredMark() {
  return (
    <span className="text-rose-600" aria-hidden="true">
      *
    </span>
  );
}

export default function InquiryForm({ defaultTab = null }: InquiryFormProps) {
  const [activeTab, setActiveTab] = useState<InquiryTab>(defaultTab);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [material, setMaterial] = useState<"Nechám si poradit" | "PETG" | "PLA" | "Jiné">("Nechám si poradit");
  const [customMaterial, setCustomMaterial] = useState("");
  const [color, setColor] = useState<"" | "Černá" | "Bílá" | "Jiná">("");
  const [customColor, setCustomColor] = useState("");
  const [prototypePackage, setPrototypePackage] = useState(false);
  const [note, setNote] = useState("");
  const [modelUrl, setModelUrl] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isCompressing, setIsCompressing] = useState(false);
  const [licenseConfirmed, setLicenseConfirmed] = useState(false);
  const [fileSizeWarning, setFileSizeWarning] = useState<string | null>(null);
  const [openTooltip, setOpenTooltip] = useState<TooltipId>(null);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const tabSectionRef = useRef<HTMLDivElement>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);
  const modelTabButtonRef = useRef<HTMLButtonElement>(null);
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const licenseRef = useRef<HTMLInputElement>(null);
  const dropzoneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{
        tab?: InquiryTab;
        prototypePackage?: boolean;
        storyTitle?: string;
      }>;
      if (customEvent.detail) {
        if (customEvent.detail.prototypePackage !== undefined) {
          setPrototypePackage(customEvent.detail.prototypePackage);
          setQuantity((prev) => {
            const num = parseInt(prev, 10);
            return isNaN(num) || num < 3 ? "3" : prev;
          });
          if (customEvent.detail.tab) {
            setActiveTab(customEvent.detail.tab);
          }
          setHighlightedField("prototypePackage");
        } else if (customEvent.detail.tab) {
          setActiveTab(customEvent.detail.tab);
          setHighlightedField(`tab-${customEvent.detail.tab}`);
        }

        if (customEvent.detail.storyTitle) {
          const title = customEvent.detail.storyTitle;
          setNote((prev) => {
            if (!prev.trim() || prev.startsWith("Poptávka na základě realizace:")) {
              return `Poptávka na základě realizace: ${title} – `;
            }
            return prev;
          });
        }

        if (highlightTimeoutRef.current) {
          clearTimeout(highlightTimeoutRef.current);
        }
        highlightTimeoutRef.current = setTimeout(() => {
          setHighlightedField(null);
        }, 2200);
      }
    };

    window.addEventListener("select-inquiry-tab", handleTabChange);
    return () => {
      window.removeEventListener("select-inquiry-tab", handleTabChange);
      if (highlightTimeoutRef.current) {
        clearTimeout(highlightTimeoutRef.current);
      }
    };
  }, []);

  // Po úspěšném odeslání přesunout fokus na nadpis potvrzení
  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
      successHeadingRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [status]);

  // Close open tooltip on outside click / touch
  useEffect(() => {
    if (!openTooltip) return;
    const handleOutsideClick = () => setOpenTooltip(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [openTooltip]);

  const toggleTooltip = (e: React.MouseEvent, id: Exclude<TooltipId, null>) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenTooltip((prev) => (prev === id ? null : id));
  };

  const acceptedFormats = ".step, .stp, .stl, .3mf, .pdf, .zip, .jpg, .jpeg, .png, .dwg, .dxf";

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setFileSizeWarning(null);
    setIsCompressing(true);

    const fileArray = Array.from(files);
    const newFiles: UploadedFile[] = [];
    const maxTotalSize = 4 * 1024 * 1024; // 4 MB

    let currentTotal = uploadedFiles.reduce((acc, curr) => acc + curr.file.size, 0);
    let detected3dModel = false;
    let detectedDrawingOrPhoto = false;

    try {
      for (let i = 0; i < fileArray.length; i++) {
        const rawFile = fileArray[i];
        const { file, originalSize } = await compressImageIfNeeded(rawFile);

        if (currentTotal + file.size > maxTotalSize) {
          setFileSizeWarning(
            `Soubor „${rawFile.name}“ přesahuje limit 4 MB pro webový formulář. Větší modely nebo archivy mi prosím pošlete přímo na e-mail info@3dspline.cz nebo vložte odkaz do pole níže.`
          );
          break;
        }

        currentTotal += file.size;
        const isImg = file.type.startsWith("image/");
        if (/\.(step|stp|stl|3mf)$/i.test(file.name)) {
          detected3dModel = true;
        } else if (/\.(jpg|jpeg|png|pdf|dwg|dxf)$/i.test(file.name)) {
          detectedDrawingOrPhoto = true;
        }

        newFiles.push({
          file,
          id: `${file.name}-${file.size}-${Date.now()}-${i}`,
          previewUrl: isImg ? URL.createObjectURL(file) : undefined,
          originalSize,
        });
      }

      if (newFiles.length > 0) {
        setUploadedFiles((prev) => [...prev, ...newFiles]);
        // Smart auto-selection of tab if user hasn't picked one yet
        if (!activeTab) {
          if (detected3dModel) {
            setActiveTab("model");
          } else if (detectedDrawingOrPhoto) {
            setActiveTab("drawing");
          }
        }
      }
    } finally {
      setIsCompressing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleModelUrlChange = (val: string) => {
    setModelUrl(val);
    if (!activeTab && /(printables\.com|makerworld\.com|thingiverse\.com|cults3d\.com|thangs\.com)/i.test(val)) {
      setActiveTab("model");
    }
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
    setFileSizeWarning(null);
  };

  const adjustQuantity = (delta: number) => {
    const current = parseInt(quantity, 10);
    const base = isNaN(current) ? 1 : current;
    const next = Math.max(1, base + delta);
    setQuantity(String(next));
    if (next < 3) {
      setPrototypePackage(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    void handleFiles(e.dataTransfer.files);
  };

  const requiresLicenseCheck =
    activeTab === "model" || uploadedFiles.length > 0 || modelUrl.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptingInquiries) return;
    setStatus("submitting");
    setErrorMessage("");

    if (!activeTab) {
      setStatus("error");
      setErrorMessage("Prosím vyberte nahoře, zda máte nebo nemáte 3D model.");
      setHighlightedField("tab-selection");
      tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      modelTabButtonRef.current?.focus({ preventScroll: true });
      return;
    }

    if (!note.trim()) {
      setStatus("error");
      setErrorMessage("Prosím vyplňte podrobný popis (účel dílu, prostředí použití nebo Vaše požadavky).");
      noteRef.current?.focus();
      return;
    }

    if (requiresLicenseCheck && !licenseConfirmed) {
      setStatus("error");
      setErrorMessage("Pro odeslání prosím potvrďte, že disponujete autorskými právy nebo licencí k dodaným podkladům.");
      licenseRef.current?.focus();
      return;
    }

    try {
      const effectiveMaterial =
        material === "Jiné"
          ? customMaterial.trim()
            ? `Jiné: ${customMaterial.trim()}`
            : "Jiné"
          : material;

      const effectiveColor =
        color === "Jiná"
          ? customColor.trim()
            ? `Jiná: ${customColor.trim()}`
            : "Jiná"
          : color;

      const formData = new FormData();
      formData.append("tab", activeTab);
      formData.append("name", name.trim());
      formData.append("email", email.trim());
      formData.append("quantity", `${quantity.trim() ? quantity.trim() : "1"} ks`);
      formData.append("material", effectiveMaterial);
      formData.append("color", effectiveColor);
      formData.append("prototypePackage", prototypePackage ? "true" : "false");
      formData.append("licenseConfirmed", licenseConfirmed ? "true" : "false");
      formData.append("note", note);
      formData.append("modelUrl", modelUrl.trim());
      formData.append("website", honeypot);

      uploadedFiles.forEach((item) => {
        formData.append("files", item.file);
      });

      let res: Response;
      try {
        res = await fetch("/api/inquiry", {
          method: "POST",
          body: formData,
        });
      } catch {
        throw new Error("Nepodařilo se spojit se serverem. Zkontrolujte prosím připojení k internetu a zkuste to znovu.");
      }

      // Server nemusí vždy odpovědět JSONem (např. hosting při příliš velkém požadavku nebo timeoutu).
      const data: { success?: boolean; message?: string; error?: string } | null = await res
        .json()
        .catch(() => null);

      if (res.status === 413) {
        throw new Error(
          "Přílohy jsou pro webový formulář příliš velké. Pošlete mi je prosím přímo na info@3dspline.cz, nebo vložte odkaz na úložiště."
        );
      }

      if (!res.ok || !data?.success) {
        throw new Error(
          data?.error ||
            "Poptávku se teď nepodařilo odeslat. Zkuste to prosím za chvíli znovu, nebo mi napište přímo na info@3dspline.cz."
        );
      }

      setStatus("success");
      setSuccessMessage(
        data?.message ||
          "Děkuji! Poptávka je odeslaná. Na e-mail jsem vám poslal potvrzení. Ve všední dny se ozvu do 24 hodin."
      );
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("Nepodařilo se odeslat poptávku. Zkontrolujte prosím připojení a zkuste to znovu.");
      }
    }
  };

  const resetForm = () => {
    uploadedFiles.forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
    setActiveTab(defaultTab);
    setName("");
    setEmail("");
    setQuantity("1");
    setMaterial("Nechám si poradit");
    setCustomMaterial("");
    setColor("");
    setCustomColor("");
    setPrototypePackage(false);
    setNote("");
    setModelUrl("");
    setHoneypot("");
    setUploadedFiles([]);
    setFileSizeWarning(null);
    setStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
  };

  const notePlaceholder =
    activeTab === "model"
      ? "Např.: Držák senzoru, požadujeme vyšší mechanickou pevnost, použití v interiéru..."
      : activeTab === "drawing"
      ? "Např.: Potřebuji vyrobit náhradu prasklého dílu (viz přiložená fotka), průměr cca 40 mm..."
      : "Popište účel dílu, jak bude namáhán nebo v jakém prostředí bude sloužit (interiér, venku, v autě)...";

  return (
    <section id="poptavka" className="py-16 sm:py-20 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 sm:mb-10">
          <h2 className="section-title text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Rychlá nezávazná poptávka
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start">
          {/* Formulář */}
          <div className="lg:col-span-8 lg:pr-12">
            {status === "success" ? (
              <div className="py-10 border-y border-slate-200">
                <h3
                  ref={successHeadingRef}
                  tabIndex={-1}
                  className="text-xl font-bold text-slate-900 tracking-tight outline-none"
                >
                  Poptávka byla v pořádku přijata
                </h3>
                <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
                  {successMessage}
                </p>
                <dl className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4 max-w-2xl">
                  <div>
                    <dt className="text-xs text-slate-500">Potvrzení</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900 break-all">{email}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Odpověď</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">
                      ve všední dny do 24 hodin
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-500">Doručení</dt>
                    <dd className="mt-1 text-sm font-semibold text-slate-900">Rychlý kurýr po celé ČR</dd>
                  </div>
                </dl>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  <span>Odeslat další poptávku</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
              {!acceptingInquiries && (
                <p
                  id="inquiry-closed-notice"
                  className="mb-6 flex items-start gap-2.5 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm font-semibold text-amber-900"
                >
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{informativeNotice} Formulář je proto vypnutý.</span>
                </p>
              )}
              {/* inert vypne klikání, psaní i klávesnici v celém formuláři včetně nahrávání souborů */}
              <form
                onSubmit={handleSubmit}
                inert={!acceptingInquiries}
                aria-describedby={acceptingInquiries ? undefined : "inquiry-closed-notice"}
                className={`relative ${acceptingInquiries ? "" : "opacity-50 select-none"}`}
              >
                {/* Anti-spam Honeypot field (hidden from real users) */}
                <div
                  className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden"
                  aria-hidden="true"
                >
                  <label htmlFor="company-website-hp">Webová stránka</label>
                  <input
                    id="company-website-hp"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div className="divide-y divide-slate-200 border-y border-slate-200">
                  {/* Podklady pro výrobu */}
                  <div ref={tabSectionRef} className={rowClass}>
                    <span id="inquiry-tab-label" className={labelClass}>
                      Podklady pro výrobu <RequiredMark />
                    </span>

                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-tab-label"
                      aria-required="true"
                      className={`flex flex-wrap items-center gap-x-6 gap-y-2 rounded-md transition-shadow ${
                        highlightedField === "tab-selection" ? "ring-2 ring-rose-500 ring-offset-4" : ""
                      }`}
                    >
                      <button
                        ref={modelTabButtonRef}
                        type="button"
                        role="radio"
                        aria-checked={activeTab === "model"}
                        onClick={() => {
                          setActiveTab("model");
                          if (highlightedField === "tab-selection") {
                            setHighlightedField(null);
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                        className={`${segmentClass} ${activeTab === "model" ? segmentOnClass : segmentOffClass} ${
                          highlightedField === "tab-model" ? "animate-field-highlight" : ""
                        }`}
                      >
                        Mám model
                      </button>

                      <button
                        type="button"
                        role="radio"
                        aria-checked={activeTab === "drawing"}
                        onClick={() => {
                          setActiveTab("drawing");
                          if (highlightedField === "tab-selection") {
                            setHighlightedField(null);
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                        className={`${segmentClass} ${activeTab === "drawing" ? segmentOnClass : segmentOffClass} ${
                          highlightedField === "tab-drawing" ? "animate-field-highlight" : ""
                        }`}
                      >
                        Nemám model
                      </button>
                    </div>
                  </div>

                  {/* Vaše jméno */}
                  <div className={rowClass}>
                    <label htmlFor="inquiry-name" className={labelClass}>
                      Vaše jméno <span className="text-slate-500 font-normal">(volitelné)</span>
                    </label>
                    <input
                      id="inquiry-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      maxLength={120}
                      placeholder="např. Jan Novák"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`${inputClass} w-full sm:flex-1`}
                    />
                  </div>

                  {/* Váš e-mail */}
                  <div className={rowClass}>
                    <label htmlFor="inquiry-email" className={labelClass}>
                      Váš e-mail <RequiredMark />
                    </label>
                    <input
                      id="inquiry-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="např. jan.novak@email.cz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`${inputClass} w-full sm:flex-1`}
                    />
                  </div>

                  {/* Počet kusů & Prototypovací balíček */}
                  <div className={rowClass}>
                    <label htmlFor="inquiry-quantity" className={labelClass}>
                      Počet kusů
                    </label>
                    <div className="flex flex-wrap items-center gap-x-5 gap-y-3 flex-1">
                      <div className="inline-flex items-center rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-colors">
                        <button
                          type="button"
                          onClick={() => adjustQuantity(-1)}
                          aria-label="Snížit počet kusů"
                          className="px-3 py-2.5 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="relative w-20 border-x border-slate-200">
                          <input
                            id="inquiry-quantity"
                            type="number"
                            min="1"
                            step="1"
                            placeholder="1"
                            value={quantity}
                            onChange={(e) => {
                              const val = e.target.value;
                              setQuantity(val);
                              const num = parseInt(val, 10);
                              if (isNaN(num) || num < 3) {
                                setPrototypePackage(false);
                              }
                            }}
                            className="w-full pl-2 pr-7 py-2.5 bg-transparent text-center text-slate-900 text-sm placeholder-slate-400 focus:outline-none font-semibold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 pointer-events-none select-none">
                            ks
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => adjustQuantity(1)}
                          aria-label="Zvýšit počet kusů"
                          className="px-3 py-2.5 text-slate-500 hover:text-slate-900 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Prototypovací balíček - aktivní od 3 ks */}
                      {(() => {
                        const qtyNum = parseInt(quantity, 10);
                        const isEligible = !isNaN(qtyNum) && qtyNum >= 3;
                        const isTooltipOpen = openTooltip === "prototype";

                        return (
                          <div
                            className={`inline-flex items-center gap-2 select-none py-1 rounded-md transition-all ${
                              isEligible ? "text-slate-900" : "text-slate-400"
                            } ${
                              highlightedField === "prototypePackage"
                                ? "px-2 -mx-2 bg-blue-50 ring-2 ring-blue-600"
                                : ""
                            }`}
                          >
                            <input
                              id="prototype-pkg-checkbox"
                              type="checkbox"
                              disabled={!isEligible}
                              checked={isEligible && prototypePackage}
                              onChange={(e) => {
                                if (isEligible) {
                                  setPrototypePackage(e.target.checked);
                                }
                              }}
                              className={`w-4 h-4 accent-blue-600 ${
                                isEligible ? "cursor-pointer" : "cursor-not-allowed opacity-50"
                              }`}
                            />
                            <label
                              htmlFor={isEligible ? "prototype-pkg-checkbox" : undefined}
                              className={`text-sm ${isEligible ? "cursor-pointer" : "cursor-not-allowed"}`}
                            >
                              Chci nejdříve
                            </label>

                            <span
                              role="button"
                              tabIndex={0}
                              aria-describedby="tooltip-prototype"
                              onClick={(e) => toggleTooltip(e, "prototype")}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  toggleTooltip(e as unknown as React.MouseEvent, "prototype");
                                }
                              }}
                              className="relative inline-flex items-center group cursor-pointer text-sm"
                            >
                              <span
                                className={`font-semibold underline decoration-1 underline-offset-2 ${
                                  isEligible
                                    ? "text-slate-900 decoration-slate-400 hover:text-blue-600"
                                    : "text-slate-400 decoration-slate-300"
                                }`}
                              >
                                Prototypovací balíček
                              </span>
                              {!isEligible && (
                                <span className="ml-1 text-xs text-slate-400">(od 3 ks)</span>
                              )}
                              <HelpCircle className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-slate-700 transition-colors" />

                              {/* Tooltip (hover na desktopu, klik/tap na mobilu) */}
                              <span
                                id="tooltip-prototype"
                                role="tooltip"
                                className={`${tooltipClass} bottom-full left-1/2 -translate-x-1/2 w-64 ${
                                  isTooltipOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                                }`}
                              >
                                <strong className="block text-white font-semibold mb-0.5">
                                  Fyzický vzorek před sérií
                                </strong>
                                {isEligible
                                  ? "Při výrobě více kusů vám nejdřív vyrobím jeden zkušební kus na vyzkoušení. Sérii spustím až po vašem schválení."
                                  : "Dostupné od 3 kusů. Nejdřív vám vyrobím jeden zkušební kus, na kterém ověříte rozměry a lícování."}
                              </span>
                            </span>
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Materiál */}
                  <div className={rowClass}>
                    <span id="inquiry-material-label" className={labelClass}>
                      Materiál
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-material-label"
                      className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-2"
                    >
                      {(["Nechám si poradit", "PETG", "PLA", "Jiné"] as const).map((mat) => (
                        <button
                          key={mat}
                          type="button"
                          role="radio"
                          aria-checked={material === mat}
                          onClick={() => setMaterial(mat)}
                          className={`${segmentClass} ${material === mat ? segmentOnClass : segmentOffClass}`}
                        >
                          {mat}
                        </button>
                      ))}

                      {material === "Jiné" && (
                        <input
                          type="text"
                          autoFocus
                          aria-label="Vlastní materiál"
                          placeholder="např. ASA, TPU..."
                          value={customMaterial}
                          onChange={(e) => setCustomMaterial(e.target.value)}
                          className={`${inputClass} flex-1 min-w-[180px] py-2`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Barva */}
                  <div className={rowClass}>
                    <span id="inquiry-color-label" className={labelClass}>
                      Barva
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="inquiry-color-label"
                      className="flex-1 flex flex-wrap items-center gap-x-6 gap-y-2"
                    >
                      {(["Černá", "Bílá", "Jiná"] as const).map((c) => (
                        <button
                          key={c}
                          type="button"
                          role="radio"
                          aria-checked={color === c}
                          onClick={() => setColor(c)}
                          className={`${segmentClass} ${color === c ? segmentOnClass : segmentOffClass}`}
                        >
                          <span
                            aria-hidden="true"
                            className={`w-2.5 h-2.5 rounded-full shrink-0 ${
                              c === "Černá"
                                ? "bg-slate-950"
                                : c === "Bílá"
                                ? "bg-white border border-slate-300"
                                : "bg-[conic-gradient(at_center,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)]"
                            }`}
                          />
                          {c}
                        </button>
                      ))}

                      {color === "Jiná" && (
                        <input
                          type="text"
                          autoFocus
                          aria-label="Vlastní barva"
                          placeholder="např. Šedá, Oranžová, Nezáleží..."
                          value={customColor}
                          onChange={(e) => setCustomColor(e.target.value)}
                          className={`${inputClass} flex-1 min-w-[180px] py-2`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Podrobný popis */}
                  <div className={rowTopClass}>
                    <div className="sm:w-40 shrink-0 sm:pt-2.5 flex sm:flex-col items-center sm:items-start justify-between gap-1">
                      <label htmlFor="inquiry-note" className="text-sm font-semibold text-slate-900">
                        Podrobný popis <RequiredMark />
                      </label>

                      {/* Doporučený popis - tooltip */}
                      <button
                        type="button"
                        onClick={(e) => toggleTooltip(e, "description")}
                        aria-describedby="tooltip-description"
                        className="relative inline-flex items-center group cursor-pointer select-none"
                      >
                        <span className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 transition-colors">
                          <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                          <span className="underline decoration-blue-200 hover:decoration-blue-400 underline-offset-2">
                            Doporučený popis
                          </span>
                        </span>

                        <span
                          id="tooltip-description"
                          role="tooltip"
                          className={`${tooltipClass} bottom-full right-0 sm:right-auto sm:left-0 w-72 ${
                            openTooltip === "description" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <strong className="block text-white font-semibold mb-1">
                            Co mi pomůže v popisu upřesnit:
                          </strong>
                          <span className="block text-slate-300 space-y-1">
                            <span className="block">
                              • <strong className="text-slate-100">Prostředí:</strong> interiér / exteriér (UV záření, vlhkost)
                            </span>
                            <span className="block">
                              • <strong className="text-slate-100">Zatížení:</strong> mechanické namáhání, otěr, rázy
                            </span>
                            <span className="block">
                              • <strong className="text-slate-100">Teploty:</strong> běžná teplota vs. vystavení teplu (např. v autě)
                            </span>
                            <span className="block">
                              • <strong className="text-slate-100">Termín:</strong> standardní posouzení nebo zda zakázka spěchá
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>

                    <textarea
                      id="inquiry-note"
                      ref={noteRef}
                      rows={4}
                      required
                      placeholder={notePlaceholder}
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className={`${inputClass} w-full sm:flex-1`}
                    />
                  </div>

                  {/* Přílohy a odkaz */}
                  <div className={rowTopClass}>
                    <div className="sm:w-40 shrink-0 sm:pt-2.5">
                      <div className="text-sm font-semibold text-slate-900">
                        {activeTab === "drawing"
                          ? "Přílohy (fotka dílu, náčrt, výkres)"
                          : activeTab === "model"
                          ? "Přílohy (3D model .STEP, .STL, .3MF)"
                          : "Přílohy"}{" "}
                        <span className="text-slate-500 font-normal">(volitelné)</span>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">max. 4 MB (fotky se zmenší automaticky)</div>
                    </div>

                    <div className="flex-1 min-w-0 space-y-2.5">
                      <p id="dropzone-hint" className="sr-only">
                        Povolené formáty: STEP, STP, STL, 3MF, PDF, DWG, DXF, ZIP, JPG, PNG. Maximálně 4 MB celkem.
                      </p>
                      <div
                        ref={dropzoneRef}
                        role="button"
                        tabIndex={0}
                        aria-label="Přiložit soubory – vybrat z disku"
                        aria-describedby="dropzone-hint"
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => fileInputRef.current?.click()}
                        onKeyDown={(e) => {
                          // Reagovat jen na klávesy přímo na dropzone, ne na vnořené tlačítko
                          if (e.target !== e.currentTarget) return;
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            fileInputRef.current?.click();
                          }
                        }}
                        className={`border border-dashed rounded-md px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 ${
                          isDragging
                            ? "border-blue-600 bg-blue-50"
                            : "border-slate-300 hover:border-blue-600 hover:bg-blue-50/40"
                        }`}
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          accept={acceptedFormats}
                          className="hidden"
                          tabIndex={-1}
                          aria-hidden="true"
                          onChange={(e) => void handleFiles(e.target.files)}
                        />

                        <div className="flex items-center gap-2.5">
                          {isCompressing ? (
                            <Loader2 className="w-5 h-5 text-blue-600 animate-spin shrink-0" />
                          ) : (
                            <UploadCloud className="w-5 h-5 text-slate-400 shrink-0" />
                          )}
                          <p className="text-sm text-slate-700">
                            {isCompressing ? (
                              <span>Optimalizuji velikost fotek...</span>
                            ) : (
                              <>
                                Přetáhněte soubory nebo{" "}
                                <span className="text-blue-600 font-semibold underline underline-offset-2">
                                  vyberte z disku
                                </span>
                              </>
                            )}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => toggleTooltip(e, "dropzone-formats")}
                          onKeyDown={(e) => e.stopPropagation()}
                          aria-describedby="tooltip-dropzone-formats"
                          className="relative inline-flex items-center self-start sm:self-auto shrink-0 whitespace-nowrap group cursor-pointer select-none text-xs text-slate-500"
                        >
                          <span className="underline decoration-slate-300 decoration-dotted underline-offset-2 hover:text-slate-900 transition-colors">
                            Kompatibilní formáty
                          </span>
                          <span
                            id="tooltip-dropzone-formats"
                            role="tooltip"
                            className={`${tooltipClass} bottom-full left-0 sm:left-auto sm:right-0 w-64 ${
                              openTooltip === "dropzone-formats" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            }`}
                          >
                            <strong className="block text-white font-semibold mb-1">Podporované formáty</strong>
                            <span className="block text-slate-300 mb-1">
                              .STEP, .STP, .STL, .3MF, .PDF, .DWG, .DXF, .ZIP, .JPG, .PNG
                            </span>
                            <span className="block text-slate-400">
                              Velké fotky z mobilu se automaticky zmenší. Pro objemnější 3D modely můžete vložit odkaz níže.
                            </span>
                          </span>
                        </button>
                      </div>

                      {/* Upozornění při překročení 4 MB */}
                      {fileSizeWarning && (
                        <div
                          role="status"
                          className="p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-sm flex items-start gap-2.5"
                        >
                          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <div className="leading-relaxed">
                            <span>{fileSizeWarning} </span>
                            <a
                              href="mailto:info@3dspline.cz?subject=Popt%C3%A1vka%203D%20tisku%20-%20nadlimitn%C3%AD%20p%C5%99%C3%ADloha"
                              className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-800"
                            >
                              Poslat na info@3dspline.cz
                            </a>
                          </div>
                        </div>
                      )}

                      {uploadedFiles.length > 0 && (
                        <ul className="divide-y divide-slate-200 border border-slate-200 rounded-md">
                          {uploadedFiles.map((item) => (
                            <li key={item.id} className="flex items-center justify-between gap-2 px-3 py-2">
                              <div className="flex items-center gap-3 overflow-hidden">
                                {item.previewUrl ? (
                                  // eslint-disable-next-line @next/next/no-img-element
                                  <img
                                    src={item.previewUrl}
                                    alt={item.file.name}
                                    className="w-9 h-9 object-cover shrink-0 bg-slate-100"
                                  />
                                ) : (
                                  <span className="w-9 h-9 bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                                    {item.file.name.match(/\.(step|stp|stl|3mf)$/i) ? (
                                      <FileBox className="w-4 h-4" />
                                    ) : item.file.name.match(/\.(pdf|dwg|dxf)$/i) ? (
                                      <FileText className="w-4 h-4" />
                                    ) : (
                                      <FileCheck2 className="w-4 h-4" />
                                    )}
                                  </span>
                                )}

                                <div className="min-w-0">
                                  <span className="block truncate text-sm text-slate-900 font-medium">
                                    {item.file.name}
                                  </span>
                                  <span className="block text-xs text-slate-500">
                                    {(item.file.size / 1024).toFixed(1)} KB
                                    {item.originalSize && item.originalSize > item.file.size && (
                                      <span className="text-emerald-700 ml-1.5">
                                        (zmenšeno z {(item.originalSize / (1024 * 1024)).toFixed(1)} MB)
                                      </span>
                                    )}
                                  </span>
                                </div>
                              </div>
                              <button
                                type="button"
                                aria-label={`Odebrat soubor ${item.file.name}`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFile(item.id);
                                }}
                                className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors shrink-0"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}

                      {/* Odkaz na model nebo úložiště */}
                      <div className="flex items-center rounded-md border border-slate-300 bg-white focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 transition-colors">
                        <span className="pl-3.5 pr-2 text-slate-400 shrink-0">
                          <Link2 className="w-4 h-4" />
                        </span>
                        <input
                          id="inquiry-model-url"
                          name="modelUrl"
                          type="text"
                          aria-label="Odkaz na model nebo úložiště"
                          placeholder="Nebo vložte odkaz na model či úložiště (Printables, MakerWorld, Úschovna, Google Drive...)"
                          value={modelUrl}
                          onChange={(e) => handleModelUrlChange(e.target.value)}
                          className="w-full pr-3.5 py-2.5 bg-transparent text-slate-900 text-sm placeholder-slate-400 outline-none"
                        />
                      </div>

                      <p className="text-xs text-slate-500">
                        Vaše modely a výkresy nikde nezveřejňuji. Slouží jen pro posouzení a výrobu.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-5">
                  {status === "error" && (
                    <div
                      role="alert"
                      aria-live="assertive"
                      className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-sm flex items-start gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* Licenční prohlášení */}
                  {requiresLicenseCheck && (
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        ref={licenseRef}
                        type="checkbox"
                        checked={licenseConfirmed}
                        onChange={(e) => setLicenseConfirmed(e.target.checked)}
                        className="mt-0.5 w-4 h-4 accent-blue-600 cursor-pointer shrink-0"
                        required
                      />
                      <span className="text-sm text-slate-600 leading-snug">
                        Prohlašuji, že k zaslaným podkladům vlastním autorská práva nebo oprávnění (licenci) k jejich zakázkové výrobě.
                      </span>
                    </label>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={status === "submitting" || isCompressing}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-md bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Poptávka se odesílá...</span>
                        </>
                      ) : (
                        <>
                          <span>Odeslat nezávaznou poptávku</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="mt-3 text-xs text-slate-500 leading-relaxed max-w-xl">
                      Odesláním poptávky souhlasíte s{" "}
                      <Link
                        href="/obchodni-podminky"
                        className="text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors"
                      >
                        obchodními podmínkami
                      </Link>
                      . Osobní údaje zpracovávám podle{" "}
                      <Link
                        href="/ochrana-osobnich-udaju"
                        className="text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors"
                      >
                        zásad ochrany osobních údajů
                      </Link>
                      . Poptávka je zcela nezávazná a bezplatná.
                    </p>
                  </div>
                </div>
              </form>
              </>
            )}
          </div>

          {/* Přímý kontakt a NDA */}
          <aside className="lg:col-span-4 bg-blueprint text-white border-t-2 border-blue-500 p-6 sm:p-8 space-y-8">
            <div>
              <h3 className="text-base font-bold text-white">Přímý kontakt a konzultace</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Nevyhovuje vám formulář nebo chcete nejprve nezávazně zkonzultovat vyrobitelnost, pevnost či volbu materiálu? Napište mi přímo.
              </p>
              <a
                href="mailto:info@3dspline.cz"
                className="mt-4 inline-flex items-center gap-1.5 text-lg font-semibold text-blue-400 hover:text-blue-300 transition-colors"
              >
                <span className="link-underline">info@3dspline.cz</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                Můžete přiložit fotografie, náčrty s rozměry nebo odkaz na cloudové úložiště (Úschovna, Disk).
              </p>
            </div>

            <div className="pt-8 border-t border-slate-700">
              <h3 className="text-base font-bold text-white">Dohoda o mlčenlivosti (NDA)</h3>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed">
                Máte nový výrobek nebo interní výkres podléhající utajení? Před zasláním CAD dat vám obratem podepíšu vaše NDA, případně pošlu svoje.
              </p>
              <a
                href="mailto:info@3dspline.cz?subject=Žádost%20o%20podpis%20NDA%20před%20poptávkou"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-white hover:text-blue-300 transition-colors"
              >
                <span className="link-underline">Vyžádat podpis NDA</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
