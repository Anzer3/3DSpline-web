"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  FileCode2,
  DraftingCompass,
  UploadCloud,
  FileCheck2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Lock,
  ArrowRight,
  Sparkles,
  Image as ImageIcon,
  FileBox,
  FileText,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

type InquiryTab = "model" | "drawing" | null;

interface UploadedFile {
  file: File;
  id: string;
  previewUrl?: string;
}

export default function InquiryForm() {
  const [activeTab, setActiveTab] = useState<InquiryTab>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [material, setMaterial] = useState<"Nechám si poradit" | "PETG" | "PLA" | "Jiné">("Nechám si poradit");
  const [customMaterial, setCustomMaterial] = useState("");
  const [color, setColor] = useState<"Černá" | "Bílá" | "Jiná">("Černá");
  const [customColor, setCustomColor] = useState("");
  const [prototypePackage, setPrototypePackage] = useState(false);
  const [note, setNote] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [licenseConfirmed, setLicenseConfirmed] = useState(false);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [highlightedField, setHighlightedField] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const highlightTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: InquiryTab; prototypePackage?: boolean }>;
      if (customEvent.detail) {
        if (customEvent.detail.prototypePackage !== undefined) {
          setPrototypePackage(customEvent.detail.prototypePackage);
          setHighlightedField("prototypePackage");
        } else if (customEvent.detail.tab) {
          setActiveTab(customEvent.detail.tab);
          setHighlightedField(`tab-${customEvent.detail.tab}`);
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

  const acceptedFormats = ".step, .stp, .stl, .3mf, .pdf, .zip, .jpg, .jpeg, .png, .dwg, .dxf";

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const newFiles: UploadedFile[] = [];
    const maxTotalSize = 25 * 1024 * 1024; // 25 MB

    let currentTotal = uploadedFiles.reduce((acc, curr) => acc + curr.file.size, 0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (currentTotal + file.size > maxTotalSize) {
        alert("Celková velikost vybraných souborů přesahuje limit 25 MB.");
        break;
      }
      currentTotal += file.size;
      const isImg = file.type.startsWith("image/");
      newFiles.push({
        file,
        id: `${file.name}-${file.size}-${Date.now()}-${i}`,
        previewUrl: isImg ? URL.createObjectURL(file) : undefined,
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => {
      const target = prev.find((item) => item.id === id);
      if (target?.previewUrl) {
        URL.revokeObjectURL(target.previewUrl);
      }
      return prev.filter((item) => item.id !== id);
    });
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
    handleFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!activeTab) {
      setStatus("error");
      setErrorMessage("Prosím vyberte, zda máte nebo nemáte 3D model.");
      setHighlightedField("tab-selection");
      return;
    }

    if (!licenseConfirmed) {
      setStatus("error");
      setErrorMessage("Pro odeslání prosím potvrďte, že disponujete autorskými právy nebo licencí k dodaným podkladům.");
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
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("quantity", `${quantity.trim() ? quantity.trim() : "1"} ks`);
      formData.append("material", effectiveMaterial);
      formData.append("color", effectiveColor);
      formData.append("prototypePackage", prototypePackage ? "true" : "false");
      formData.append("licenseConfirmed", "true");
      formData.append("note", note);

      uploadedFiles.forEach((item) => {
        formData.append("files", item.file);
      });

      const res = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Při odesílání poptávky došlo k chybě.");
      }

      setStatus("success");
      setSuccessMessage(
        data.message ||
        "Děkujeme! Vaše poptávka byla úspěšně odeslána. Na e-mail jsme vám zaslali potvrzení a do 24 hodin se vám ozveme zpět."
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
    setActiveTab(null);
    setName("");
    setEmail("");
    setPhone("");
    setQuantity("1");
    setMaterial("Nechám si poradit");
    setCustomMaterial("");
    setColor("Černá");
    setCustomColor("");
    setPrototypePackage(false);
    setNote("");
    setUploadedFiles([]);
    setStatus("idle");
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <section id="poptavka" className="py-16 bg-white scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Rychlá nezávazná poptávka
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
            {status === "success" ? (
              <div className="p-8 text-center bg-slate-50 border border-slate-200 rounded-md">
                <div className="w-12 h-12 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1 tracking-tight">
                  Poptávka byla v pořádku přijata
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  {successMessage}
                </p>
                <div className="p-4 bg-white border border-slate-200 rounded-md text-xs text-slate-600 max-w-md mx-auto mb-6 text-left space-y-1.5 font-mono">
                  <div><strong className="text-slate-900 font-sans">Potvrzení:</strong> {email}</div>
                  <div><strong className="text-slate-900 font-sans">Odpověď:</strong> do 24 h s technickým posouzením</div>
                  <div><strong className="text-slate-900 font-sans">Doručení:</strong> Rychlý kurýr po celé ČR</div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold tracking-wide transition-colors"
                >
                  Odeslat další poptávku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 3D Model: Máte 3D model? a štítky na stejném řádku */}
                <div
                  className={`p-2 -mx-2 rounded-md transition-all ${highlightedField === "tab-selection" ? "ring-1 ring-rose-500 bg-rose-50/40" : ""
                    }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                      Podklady pro výrobu <span className="text-rose-600 font-bold">*</span>
                    </span>

                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("model");
                          setUploadedFiles([]);
                        }}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${activeTab === "model"
                            ? "bg-blue-50/50 text-blue-600 border-blue-600 ring-1 ring-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          } ${highlightedField === "tab-model" ? "ring-2 ring-blue-600 animate-field-highlight" : ""}`}
                      >
                        <span>Mám model</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveTab("drawing");
                          setUploadedFiles([]);
                        }}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${activeTab === "drawing"
                            ? "bg-blue-50/50 text-blue-600 border-blue-600 ring-1 ring-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          } ${highlightedField === "tab-drawing" ? "ring-2 ring-blue-600 animate-field-highlight" : ""}`}
                      >
                        <span>Nemám model</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Jméno a příjmení */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Jméno a příjmení <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="např. Jan Novák"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Váš e-mail */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Váš e-mail <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="např. jan.novak@email.cz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Telefon */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Telefon <span className="text-slate-400 font-normal text-xs">(volitelné)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="+420 ..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Počet kusů & Prototypovací balíček na stejném řádku */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Počet kusů
                  </label>
                  <div className="flex flex-wrap items-center gap-3 flex-1">
                    <div className="relative w-36 sm:w-40">
                      <input
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
                        className="w-full pl-3.5 pr-10 py-1.5 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-medium"
                      />
                      <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-semibold text-slate-500 pointer-events-none select-none">
                        ks
                      </span>
                    </div>

                    {/* Prototypovací balíček - aktivní od 3 ks (čistý checkbox bez štítku) */}
                    {(() => {
                      const qtyNum = parseInt(quantity, 10);
                      const isEligible = !isNaN(qtyNum) && qtyNum >= 3;

                      return (
                        <div
                          className={`inline-flex items-center gap-2 select-none py-1 transition-all ${isEligible
                              ? "text-slate-800"
                              : "text-slate-400 opacity-60 cursor-not-allowed"
                            } ${highlightedField === "prototypePackage"
                              ? "ring-1 ring-slate-900 rounded px-1.5 bg-slate-100"
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
                            className={`w-3.5 h-3.5 rounded border-slate-300 ${isEligible
                                ? "text-slate-900 focus:ring-slate-900 cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                              }`}
                          />
                          <label
                            htmlFor={isEligible ? "prototype-pkg-checkbox" : undefined}
                            className={`text-xs font-medium flex items-center gap-1.5 ${isEligible ? "cursor-pointer text-slate-800" : "cursor-not-allowed text-slate-400"
                              }`}
                          >
                            <span>Chci nejdříve</span>
                            <span className="relative inline-flex items-center group">
                              <span
                                className={`font-semibold underline decoration-1 underline-offset-2 ${isEligible
                                    ? "text-slate-900 decoration-slate-400 hover:text-blue-600"
                                    : "text-slate-400 decoration-slate-300"
                                  }`}
                              >
                                Prototypovací balíček
                              </span>
                              <HelpCircle className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-slate-700 transition-colors cursor-help" />

                              {/* Tooltip Popup */}
                              <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700">
                                <strong className="block text-slate-100 font-semibold mb-0.5">
                                  Fyzický vzorek před sérií
                                </strong>
                                {isEligible
                                  ? "Při výrobě více kusů vám nejprve vyrobíme 1 zkušební vzorek k otestování. Sérii spustíme až po vašem odsouhlasení."
                                  : "Dostupné od 3 kusů. Nejprve vám vyrobíme 1 zkušební vzorek k fyzickému ověření rozměrů a lícování."}
                                {/* Tooltip Arrow */}
                                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                              </span>
                            </span>
                          </label>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Materiál */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Materiál
                  </label>
                  <div className="flex-1 flex flex-wrap items-center gap-2">
                    {(["Nechám si poradit", "PETG", "PLA", "Jiné"] as const).map((mat) => (
                      <button
                        key={mat}
                        type="button"
                        onClick={() => setMaterial(mat)}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${material === mat
                            ? "bg-blue-50/50 text-blue-600 border-blue-600 ring-1 ring-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        <span>{mat}</span>
                      </button>
                    ))}

                    {material === "Jiné" && (
                      <input
                        type="text"
                        autoFocus
                        placeholder="např. ASA, TPU..."
                        value={customMaterial}
                        onChange={(e) => setCustomMaterial(e.target.value)}
                        className="flex-1 min-w-[180px] px-3.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-sans"
                      />
                    )}
                  </div>
                </div>

                {/* Barva */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1">
                    Barva
                  </label>
                  <div className="flex-1 flex flex-wrap items-center gap-2">
                    {(["Černá", "Bílá", "Jiná"] as const).map((c) => (
                      <button
                        key={c}
                        type="button"
                        onClick={() => setColor(c)}
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${color === c
                            ? "bg-blue-50/50 text-blue-600 border-blue-600 ring-1 ring-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                          }`}
                      >
                        {c === "Černá" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-slate-950 shrink-0 ${color === "Černá" ? "ring-1 ring-blue-600/30" : "border border-slate-700/50"
                              }`}
                          />
                        )}
                        {c === "Bílá" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-white shrink-0 border ${color === "Bílá" ? "border-blue-400" : "border-slate-300"
                              }`}
                          />
                        )}
                        {c === "Jiná" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-[conic-gradient(at_center,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)] shrink-0 ${color === "Jiná" ? "ring-1 ring-blue-600/30" : "border border-slate-300"
                              }`}
                          />
                        )}
                        <span>{c}</span>
                      </button>
                    ))}

                    {color === "Jiná" && (
                      <input
                        type="text"
                        autoFocus
                        placeholder="např. Šedá, Oranžová..."
                        value={customColor}
                        onChange={(e) => setCustomColor(e.target.value)}
                        className="flex-1 min-w-[180px] px-3.5 py-1.5 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all font-sans"
                      />
                    )}
                  </div>
                </div>


                {/* Description & Usage */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-slate-700">
                      Popis
                    </label>

                    {/* Doporučený popis - tooltip vpravo nahoře */}
                    <div className="relative inline-flex items-center group cursor-pointer select-none">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="underline decoration-blue-200 hover:decoration-blue-400 underline-offset-2">
                          Doporučený popis
                        </span>
                      </span>

                      {/* Tooltip okno */}
                      <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-72 p-3 bg-slate-900 text-white text-xs rounded-md shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700">
                        <strong className="block text-slate-100 font-semibold mb-1 text-xs">
                          Co nám pomůže v popisu upřesnit:
                        </strong>
                        <ul className="text-slate-300 text-[11px] space-y-1 list-disc list-inside">
                          <li>
                            <strong className="text-slate-200">Prostředí:</strong> interiér / exteriér (UV záření, vlhkost)
                          </li>
                          <li>
                            <strong className="text-slate-200">Zatížení:</strong> mechanické namáhání, otěr, rázy
                          </li>
                          <li>
                            <strong className="text-slate-200">Teploty:</strong> běžná teplota vs. vystavení teplu (např. v autě)
                          </li>
                          <li>
                            <strong className="text-slate-200">Termín:</strong> standardní posouzení do 24 h nebo spěchá
                          </li>
                        </ul>
                        {/* Šipka tooltipu */}
                        <span className="absolute top-full right-6 border-4 border-transparent border-t-slate-900" />
                      </div>
                    </div>
                  </div>

                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors font-sans"
                  />
                </div>

                {/* File Upload Zone - Compact Technical Style */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <span>Přílohy</span>
                      {activeTab === "model" && (
                        <span className="text-slate-400 font-normal font-sans text-xs">(nepovinné)</span>
                      )}

                      {/* Tooltip pro podporované formáty */}
                      <span className="relative inline-flex items-center group cursor-pointer">
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors cursor-help" />
                        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700">
                          <strong className="block text-slate-100 font-semibold mb-1">
                            Podporované formáty souborů
                          </strong>
                          <span className="block text-slate-300 font-mono text-[11px] mb-1.5 leading-snug">
                            .STEP, .STP, .STL, .3MF, .PDF, .DWG, .DXF, .ZIP, .PNG, .JPG
                          </span>
                          <span className="block text-slate-400 text-[11px] leading-snug">
                            Vhodné pro 3D CAD modely, technické výkresy s kótami i fotografie rozbitých dílů.
                          </span>
                          {/* Tooltip šipka */}
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                        </span>
                      </span>
                    </label>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono hidden sm:inline">
                        max. 25 MB celkem
                      </span>
                    </div>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-md py-2.5 px-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 cursor-pointer transition-all ${isDragging
                        ? "border-slate-900 bg-slate-100"
                        : "border-slate-300 bg-slate-50/50 hover:bg-slate-50 hover:border-slate-400"
                      }`}
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept={acceptedFormats}
                      className="hidden"
                      onChange={(e) => handleFiles(e.target.files)}
                    />

                    <div className="flex items-center gap-2">
                      <UploadCloud className="w-4 h-4 text-slate-500 shrink-0" />
                      <p className="text-xs text-slate-700">
                        Přetáhněte soubory nebo{" "}
                        <span className="text-slate-900 font-semibold underline underline-offset-2">
                          vyberte z disku
                        </span>
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-sans">
                      <span className="relative inline-flex items-center group cursor-pointer select-none">
                        <span className="underline decoration-slate-300 decoration-dotted underline-offset-2 hover:text-slate-900 transition-colors">
                          Kompatibilní formáty
                        </span>
                        {/* Tooltip v nahrávacím boxu */}
                        <span className="pointer-events-none absolute bottom-full right-0 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700">
                          <strong className="block text-slate-100 font-semibold mb-1">
                            Podporované formáty
                          </strong>
                          <span className="block text-slate-300 font-mono text-[11px] mb-1 leading-snug">
                            .STEP, .STP, .STL, .3MF, .PDF, .DWG, .DXF, .ZIP, .JPG, .PNG
                          </span>
                          <span className="block text-slate-400 text-[11px] leading-snug">
                            Max. celková velikost 25 MB. Pro větší soubory vložte odkaz (Úschovna, Disk) do poznámky.
                          </span>
                          <span className="absolute top-full right-4 border-4 border-transparent border-t-slate-900" />
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-1 text-[10px] text-slate-400">
                    <ShieldAlert className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>Netiskneme komponenty zbraní, tlumiče ani cizí chráněné značky bez licence.</span>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {uploadedFiles.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-md bg-white border border-slate-200 text-xs font-mono"
                        >
                          <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                            {/* File Preview Thumbnail / Icon */}
                            {item.previewUrl ? (
                              <div className="w-8 h-8 rounded border border-slate-200 overflow-hidden shrink-0 bg-slate-50 flex items-center justify-center">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={item.previewUrl}
                                  alt={item.file.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            ) : item.file.name.match(/\.(step|stp|stl|3mf)$/i) ? (
                              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                                <FileBox className="w-4 h-4" />
                              </div>
                            ) : item.file.name.match(/\.(pdf|dwg|dxf)$/i) ? (
                              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                                <FileCheck2 className="w-4 h-4" />
                              </div>
                            )}

                            <div className="truncate font-sans">
                              <span className="truncate text-slate-800 font-medium block">
                                {item.file.name}
                              </span>
                              <span className="text-slate-400 text-[10px] block font-mono">
                                {(item.file.size / 1024).toFixed(1)} KB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFile(item.id);
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* License and IP declaration checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer select-none group">
                    <input
                      type="checkbox"
                      checked={licenseConfirmed}
                      onChange={(e) => setLicenseConfirmed(e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 cursor-pointer"
                      required
                    />
                    <span className="text-xs text-slate-600 leading-snug">
                      Prohlašuji, že k zaslaným podkladům vlastním autorská práva nebo oprávnění (licenci) k jejich zakázkové výrobě.
                    </span>
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3 px-6 rounded-md bg-slate-900 hover:bg-slate-800 disabled:bg-slate-400 text-white text-xs sm:text-sm font-semibold tracking-wide transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Zpracovávám poptávku...</span>
                      </>
                    ) : (
                      <>
                        <span>Odeslat technickou poptávku</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-slate-500 leading-relaxed font-sans">
                    Odesláním poptávky berete na vědomí{" "}
                    <a
                      href="/ochrana-osobnich-udaju"
                      className="text-slate-600 hover:text-slate-900 underline underline-offset-2 transition-colors font-sans"
                    >
                      zpracování osobních údajů (GDPR)
                    </a>{" "}
                    a souhlasíte s{" "}
                    <a
                      href="/obchodni-podminky"
                      className="text-slate-600 hover:text-slate-900 underline underline-offset-2 transition-colors font-sans"
                    >
                      obchodními podmínkami
                    </a>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Right Direct Contact Sidebar */}
          <div className="lg:col-span-4 space-y-4">
            {/* Direct Contact Card */}
            <div className="bg-[#0F1E2E] rounded-2xl p-6 text-white">
              <h3 className="text-base font-bold mb-2">
                Přímý kontakt &amp; Konzultace
              </h3>

              <p className="text-slate-300 text-xs leading-relaxed mb-4">
                Rádi s vámi probereme vhodnost 3D tisku pro váš díl nebo technické detaily po e-mailu.
              </p>

              <div className="space-y-3 text-xs border-t border-slate-800/80 pt-4">
                <a
                  href="mailto:info@3dspline.cz"
                  className="flex items-center gap-2.5 text-slate-200 hover:text-blue-400 transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>info@3dspline.cz</span>
                </a>

                <div className="flex items-start gap-2.5 text-slate-300 pt-1">
                  <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs leading-relaxed">
                    <strong className="text-white block">Doručení po celé ČR</strong>
                    Spolehlivý kurýr (Zásilkovna / DPD / PPL) po celé ČR nebo možnost osobního předání v Olomouci.
                  </div>
                </div>
              </div>
            </div>

            {/* NDA Card */}
            <div className="bg-slate-50/70 rounded-2xl p-5 text-slate-800">
              <div className="flex items-start gap-3">
                <Lock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 mb-1">
                    Dohoda o mlčenlivosti (NDA)
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Máte nový výrobek nebo interní výkres podléhající utajení? Před zasláním CAD dat vám obratem podepíšeme vaše nebo naše standardní NDA.
                  </p>
                  <a
                    href="mailto:info@3dspline.cz?subject=Žádost%20o%20podpis%20NDA%20před%20poptávkou"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 mt-2"
                  >
                    <span>Vyžádat podpis NDA</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
