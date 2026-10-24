"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  UploadCloud,
  FileCheck2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Mail,
  MapPin,
  Lock,
  ArrowRight,
  FileBox,
  FileText,
  ShieldAlert,
  HelpCircle,
  Minus,
  Plus,
  Info,
} from "lucide-react";

type InquiryTab = "model" | "drawing" | null;
type TooltipId = "prototype" | "description" | "formats" | "dropzone-formats" | null;

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
  const [honeypot, setHoneypot] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
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

  useEffect(() => {
    const handleTabChange = (e: Event) => {
      const customEvent = e as CustomEvent<{ tab?: InquiryTab; prototypePackage?: boolean }>;
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

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    setFileSizeWarning(null);
    const newFiles: UploadedFile[] = [];
    const maxTotalSize = 4 * 1024 * 1024; // 4 MB

    let currentTotal = uploadedFiles.reduce((acc, curr) => acc + curr.file.size, 0);
    let detected3dModel = false;
    let detectedDrawingOrPhoto = false;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (currentTotal + file.size > maxTotalSize) {
        setFileSizeWarning(
          `Soubor „${file.name}“ přesahuje limit 4 MB pro webový formulář. Větší modely nebo archivy nám prosím pošlete přímo na e-mail info@3dspline.cz (případně vložte odkaz na Úschovnu či Disk do popisu).`
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
    handleFiles(e.dataTransfer.files);
  };

  const requiresLicenseCheck = activeTab === "model" || uploadedFiles.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!activeTab) {
      setStatus("error");
      setErrorMessage("Prosím vyberte nahoře, zda máte nebo nemáte 3D model.");
      setHighlightedField("tab-selection");
      tabSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!note.trim()) {
      setStatus("error");
      setErrorMessage("Prosím vyplňte podrobný popis (účel dílu, prostředí použití nebo Vaše požadavky).");
      return;
    }

    if (requiresLicenseCheck && !licenseConfirmed) {
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

      const formattedPhone = phone.trim()
        ? phone.trim().startsWith("+")
          ? phone.trim()
          : `+420 ${phone.trim()}`
        : "Neuvedeno";

      const formData = new FormData();
      formData.append("tab", activeTab);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", formattedPhone);
      formData.append("quantity", `${quantity.trim() ? quantity.trim() : "1"} ks`);
      formData.append("material", effectiveMaterial);
      formData.append("color", effectiveColor);
      formData.append("prototypePackage", prototypePackage ? "true" : "false");
      formData.append("licenseConfirmed", "true");
      formData.append("note", note);
      formData.append("website", honeypot);

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
    uploadedFiles.forEach((item) => {
      if (item.previewUrl) {
        URL.revokeObjectURL(item.previewUrl);
      }
    });
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
      : "Stručně popište účel dílu, jak bude namáhán nebo v jakém prostředí bude sloužit (interiér, venku, v autě)...";

  return (
    <section id="poptavka" className="py-16 bg-white border-b border-slate-200 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Rychlá nezávazná poptávka
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-sm">
            {/* Oznámení o přípravě formuláře */}
            <div className="mb-6 p-4 rounded-lg bg-rose-50 border border-rose-200 text-rose-950 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm leading-relaxed">
                <strong className="block font-semibold text-rose-900 mb-0.5">Příjem poptávek zatím nebyl spuštěn</strong>
                <span className="text-rose-800">
                  Projekt 3D Spline je v současné době v přípravné fázi a oficiální spuštění zakázkové výroby plánujeme již brzy. Máte-li předběžný dotaz či zájem o spolupráci, můžete nás kontaktovat e-mailem na{" "}
                  <a href="mailto:info@3dspline.cz" className="font-semibold text-rose-950 underline underline-offset-2 hover:text-black">
                    info@3dspline.cz
                  </a>.
                </span>
              </div>
            </div>

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
              <form onSubmit={handleSubmit} className="space-y-4 relative">
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

                {/* 3D Model: Máte 3D model? a štítky na stejném řádku */}
                <div
                  ref={tabSectionRef}
                  className={`p-2 -mx-2 rounded-md transition-all ${
                    highlightedField === "tab-selection" ? "ring-1 ring-rose-500 bg-rose-50/40" : ""
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
                          if (highlightedField === "tab-selection") {
                            setHighlightedField(null);
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${
                          activeTab === "model"
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
                          if (highlightedField === "tab-selection") {
                            setHighlightedField(null);
                            setStatus("idle");
                            setErrorMessage("");
                          }
                        }}
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${
                          activeTab === "drawing"
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
                  <label
                    htmlFor="inquiry-name"
                    className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1"
                  >
                    Jméno a příjmení <span className="text-rose-600 font-bold">*</span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="např. Jan Novák"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Váš e-mail */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label
                    htmlFor="inquiry-email"
                    className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1"
                  >
                    Váš e-mail <span className="text-rose-600 font-bold">*</span>
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
                    className="flex-1 px-3.5 py-2 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors"
                  />
                </div>

                {/* Telefon */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4">
                  <label
                    htmlFor="inquiry-phone"
                    className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1"
                  >
                    Telefon <span className="text-slate-400 font-normal text-xs">(volitelné)</span>
                  </label>
                  <div className="flex-1 flex items-center rounded-md border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all overflow-hidden">
                    <span className="px-3 py-2 bg-slate-50 border-r border-slate-200 text-slate-600 text-xs sm:text-sm font-medium select-none shrink-0 font-mono">
                      +420
                    </span>
                    <input
                      id="inquiry-phone"
                      name="phone"
                      type="tel"
                      inputMode="numeric"
                      autoComplete="tel-national"
                      placeholder="777 123 456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-transparent text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none"
                    />
                  </div>
                </div>

                {/* Počet kusů & Prototypovací balíček na stejném řádku */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label
                    htmlFor="inquiry-quantity"
                    className="text-xs sm:text-sm font-semibold text-slate-700 sm:w-40 shrink-0 flex items-center gap-1"
                  >
                    Počet kusů
                  </label>
                  <div className="flex flex-wrap items-center gap-3 flex-1">
                    <div className="inline-flex items-center rounded-md border border-slate-200 bg-white focus-within:ring-2 focus-within:ring-blue-600/20 focus-within:border-blue-600 transition-all">
                      <button
                        type="button"
                        onClick={() => adjustQuantity(-1)}
                        aria-label="Snížit počet kusů"
                        className="px-2.5 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-l-md"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <div className="relative w-20">
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
                          className="w-full pl-2 pr-7 py-1.5 bg-transparent text-center text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none font-medium [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 pointer-events-none select-none">
                          ks
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => adjustQuantity(1)}
                        aria-label="Zvýšit počet kusů"
                        className="px-2.5 py-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-r-md"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Prototypovací balíček - aktivní od 3 ks */}
                    {(() => {
                      const qtyNum = parseInt(quantity, 10);
                      const isEligible = !isNaN(qtyNum) && qtyNum >= 3;
                      const isTooltipOpen = openTooltip === "prototype";

                      return (
                        <div
                          className={`inline-flex items-center gap-2 select-none py-1 transition-all ${
                            isEligible
                              ? "text-slate-800"
                              : "text-slate-400 opacity-75"
                          } ${
                            highlightedField === "prototypePackage"
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
                            className={`w-3.5 h-3.5 rounded border-slate-300 ${
                              isEligible
                                ? "text-slate-900 focus:ring-slate-900 cursor-pointer"
                                : "cursor-not-allowed opacity-50"
                            }`}
                          />
                          <label
                            htmlFor={isEligible ? "prototype-pkg-checkbox" : undefined}
                            className={`text-xs font-medium flex items-center gap-1 ${
                              isEligible ? "cursor-pointer text-slate-800" : "cursor-not-allowed text-slate-400"
                            }`}
                          >
                            <span>Chci nejdříve</span>
                          </label>

                          <span
                            role="button"
                            tabIndex={0}
                            onClick={(e) => toggleTooltip(e, "prototype")}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                toggleTooltip(e as unknown as React.MouseEvent, "prototype");
                              }
                            }}
                            className="relative inline-flex items-center group cursor-pointer text-xs font-medium"
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
                              <span className="ml-1 text-[11px] font-normal text-slate-400">
                                (od 3 ks)
                              </span>
                            )}
                            <HelpCircle className="w-3.5 h-3.5 ml-1 text-slate-400 group-hover:text-slate-700 transition-colors" />

                            {/* Tooltip Popup (hover on desktop + click/tap on mobile) */}
                            <span
                              className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700 ${
                                isTooltipOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              <strong className="block text-slate-100 font-semibold mb-0.5">
                                Fyzický vzorek před sérií
                              </strong>
                              {isEligible
                                ? "Při výrobě více kusů vám nejprve vyrobíme 1 zkušební vzorek k otestování. Sérii spustíme až po vašem odsouhlasení."
                                : "Dostupné od 3 kusů. Nejprve vám vyrobíme 1 zkušební vzorek k fyzickému ověření rozměrů a lícování."}
                              <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                            </span>
                          </span>
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
                        className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${
                          material === mat
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
                        className={`inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold transition-all border ${
                          color === c
                            ? "bg-blue-50/50 text-blue-600 border-blue-600 ring-1 ring-blue-600 shadow-sm"
                            : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                        }`}
                      >
                        {c === "Černá" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-slate-950 shrink-0 ${
                              color === "Černá" ? "ring-1 ring-blue-600/30" : "border border-slate-700/50"
                            }`}
                          />
                        )}
                        {c === "Bílá" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-white shrink-0 border ${
                              color === "Bílá" ? "border-blue-400" : "border-slate-300"
                            }`}
                          />
                        )}
                        {c === "Jiná" && (
                          <span
                            className={`w-2 h-2 rounded-full bg-[conic-gradient(at_center,#ef4444,#f59e0b,#10b981,#3b82f6,#8b5cf6,#ef4444)] shrink-0 ${
                              color === "Jiná" ? "ring-1 ring-blue-600/30" : "border border-slate-300"
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
                        placeholder="např. Šedá, Oranžová, Nezáleží..."
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
                    <label
                      htmlFor="inquiry-note"
                      className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1"
                    >
                      Podrobný popis <span className="text-rose-600 font-bold">*</span>
                    </label>

                    {/* Doporučený popis - tooltip vpravo nahoře */}
                    <button
                      type="button"
                      onClick={(e) => toggleTooltip(e, "description")}
                      className="relative inline-flex items-center group cursor-pointer select-none"
                    >
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 hover:text-blue-700 transition-colors">
                        <HelpCircle className="w-3.5 h-3.5 shrink-0" />
                        <span className="underline decoration-blue-200 hover:decoration-blue-400 underline-offset-2">
                          Doporučený popis
                        </span>
                      </span>

                      {/* Tooltip okno */}
                      <div
                        className={`pointer-events-none absolute bottom-full right-0 mb-2 w-72 p-3 bg-slate-900 text-white text-xs rounded-md shadow-xl transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700 ${
                          openTooltip === "description" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
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
                        <span className="absolute top-full right-6 border-4 border-transparent border-t-slate-900" />
                      </div>
                    </button>
                  </div>

                  <textarea
                    id="inquiry-note"
                    rows={3}
                    required
                    placeholder={notePlaceholder}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-md border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 outline-none focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-colors font-sans"
                  />
                </div>

                {/* File Upload Zone - Compact Technical Style */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="text-xs sm:text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                      <span>
                        {activeTab === "drawing"
                          ? "Přílohy (fotka dílu, náčrt, výkres)"
                          : activeTab === "model"
                          ? "Přílohy (3D model .STEP, .STL, .3MF)"
                          : "Přílohy"}
                      </span>
                      <span className="text-slate-400 font-normal font-sans text-xs">(volitelné)</span>

                      {/* Tooltip pro podporované formáty */}
                      <button
                        type="button"
                        onClick={(e) => toggleTooltip(e, "formats")}
                        className="relative inline-flex items-center group cursor-pointer"
                        aria-label="Podporované formáty souborů"
                      >
                        <HelpCircle className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-700 transition-colors" />
                        <span
                          className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700 ${
                            openTooltip === "formats" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <strong className="block text-slate-100 font-semibold mb-1">
                            Podporované formáty souborů
                          </strong>
                          <span className="block text-slate-300 font-mono text-[11px] mb-1.5 leading-snug">
                            .STEP, .STP, .STL, .3MF, .PDF, .DWG, .DXF, .ZIP, .PNG, .JPG
                          </span>
                          <span className="block text-slate-400 text-[11px] leading-snug">
                            Max. 4 MB přes formulář. Větší soubory prosím pošlete přímo na info@3dspline.cz.
                          </span>
                          <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900" />
                        </span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-slate-400 font-mono">
                        max. 4 MB (větší e-mailem)
                      </span>
                    </div>
                  </div>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border border-dashed rounded-md py-2.5 px-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 cursor-pointer transition-all ${
                      isDragging
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
                      <button
                        type="button"
                        onClick={(e) => toggleTooltip(e, "dropzone-formats")}
                        className="relative inline-flex items-center group cursor-pointer select-none"
                      >
                        <span className="underline decoration-slate-300 decoration-dotted underline-offset-2 hover:text-slate-900 transition-colors">
                          Kompatibilní formáty
                        </span>
                        {/* Tooltip v nahrávacím boxu */}
                        <span
                          className={`pointer-events-none absolute bottom-full right-0 mb-2 w-64 p-2.5 bg-slate-900 text-white text-xs rounded-md shadow-lg transition-all duration-200 z-30 font-sans leading-relaxed text-left border border-slate-700 ${
                            openTooltip === "dropzone-formats" ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                          }`}
                        >
                          <strong className="block text-slate-100 font-semibold mb-1">
                            Podporované formáty
                          </strong>
                          <span className="block text-slate-300 font-mono text-[11px] mb-1 leading-snug">
                            .STEP, .STP, .STL, .3MF, .PDF, .DWG, .DXF, .ZIP, .JPG, .PNG
                          </span>
                          <span className="block text-slate-400 text-[11px] leading-snug">
                            Max. celková velikost 4 MB. Pokud je soubor větší, pošlete nám ho přímo na e-mail info@3dspline.cz.
                          </span>
                          <span className="absolute top-full right-4 border-4 border-transparent border-t-slate-900" />
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Upozornění při překročení 4 MB */}
                  {fileSizeWarning && (
                    <div className="mt-2 p-3 rounded-md bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
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

                {/* License and IP declaration checkbox - required when user has a 3D model or uploads files */}
                {requiresLicenseCheck && (
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
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    className="w-full py-3 px-6 rounded-md bg-slate-100 border border-slate-300 text-slate-400 text-xs sm:text-sm font-semibold tracking-wide cursor-not-allowed flex items-center justify-center gap-2 select-none"
                  >
                    <span>Příjem poptávek bude brzy spuštěn</span>
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
