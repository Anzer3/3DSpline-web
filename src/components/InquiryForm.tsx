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
} from "lucide-react";

type InquiryTab = "model" | "drawing";

interface UploadedFile {
  file: File;
  id: string;
}

export default function InquiryForm() {
  const [activeTab, setActiveTab] = useState<InquiryTab>("drawing");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState("1 ks");
  const [material, setMaterial] = useState("Nechám si poradit (Doporučeno)");
  const [prototypePackage, setPrototypePackage] = useState(false);
  const [note, setNote] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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

  const acceptedFormats =
    activeTab === "model"
      ? ".step, .stp, .stl, .3mf, .zip"
      : ".jpg, .jpeg, .png, .pdf, .zip, .dwg, .dxf";

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
      newFiles.push({
        file,
        id: `${file.name}-${file.size}-${Date.now()}-${i}`,
      });
    }

    setUploadedFiles((prev) => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((item) => item.id !== id));
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

    try {
      const formData = new FormData();
      formData.append("tab", activeTab);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("quantity", quantity);
      formData.append("material", material);
      formData.append("prototypePackage", prototypePackage ? "true" : "false");
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
          "Děkujeme! Vaše poptávka byla úspěšně odeslána. Na e-mail jsme vám zaslali potvrzení a do 24 hodin se vám ozveme s kalkulací."
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
    setName("");
    setEmail("");
    setPhone("");
    setQuantity("1 ks");
    setMaterial("Nechám si poradit (Doporučeno)");
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
            Nezávazná poptávka
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Main Form */}
          <div className="lg:col-span-8 bg-slate-50/70 rounded-2xl p-6 sm:p-8">
            {/* Minimal Pill / Tab Selection */}
            <div className="flex flex-wrap sm:flex-nowrap gap-2 p-1 bg-slate-200/60 rounded-xl mb-6">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("drawing");
                  setUploadedFiles([]);
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ${
                  activeTab === "drawing"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                } ${highlightedField === "tab-drawing" ? "ring-2 ring-blue-500 animate-field-highlight" : ""}`}
              >
                <span>Nemám 3D model</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab("model");
                  setUploadedFiles([]);
                }}
                className={`flex-1 py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center justify-center ${
                  activeTab === "model"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-slate-600 hover:text-slate-900"
                } ${highlightedField === "tab-model" ? "ring-2 ring-blue-500 animate-field-highlight" : ""}`}
              >
                <span>Mám 3D model</span>
              </button>
            </div>

            {status === "success" ? (
              <div className="p-8 text-center bg-white rounded-xl shadow-sm">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Poptávka byla v pořádku přijata
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm max-w-md mx-auto mb-6">
                  {successMessage}
                </p>
                <div className="p-4 bg-slate-50 rounded-xl text-xs text-slate-600 max-w-md mx-auto mb-6 text-left space-y-1.5">
                  <div><strong>Potvrzení:</strong> Odesláno na e-mail {email}</div>
                  <div><strong>Další krok:</strong> Posouzení v dílně a nacenění do 24 h</div>
                  <div><strong>Doručení:</strong> Rychlý kurýr po celé ČR</div>
                </div>
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
                >
                  Odeslat další poptávku
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs Grid 1 */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Jméno a příjmení <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="např. Jan Novák"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Váš e-mail <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="např. jan.novak@email.cz"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>
                </div>

                {/* Inputs Grid 2 */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Telefon <span className="text-slate-400 font-normal">(volitelné)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+420 ..."
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Počet kusů
                    </label>
                    <input
                      type="text"
                      placeholder="např. 1 ks vzorek, 50 ks"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Materiál
                    </label>
                    <select
                      name="material"
                      value={material}
                      onChange={(e) => setMaterial(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                    >
                      <option value="Nechám si poradit (Doporučeno)">
                        Nechám si poradit (Doporučeno)
                      </option>
                      <option value="PETG">PETG</option>
                      <option value="PLA">PLA</option>
                      <option value="Jiný materiál">Jiný materiál</option>
                    </select>
                  </div>
                </div>

                {/* Prototype Package Checkbox */}
                <div className="pt-1">
                  <div
                    className={`inline-flex items-center gap-2.5 select-none px-2 py-1.5 rounded-lg transition-all ${
                      highlightedField === "prototypePackage"
                        ? "ring-2 ring-blue-500 animate-field-highlight"
                        : ""
                    }`}
                  >
                    <input
                      id="prototype-pkg-checkbox"
                      type="checkbox"
                      checked={prototypePackage}
                      onChange={(e) => setPrototypePackage(e.target.checked)}
                      className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500 cursor-pointer"
                    />
                    <label
                      htmlFor="prototype-pkg-checkbox"
                      className="text-xs sm:text-sm font-medium text-slate-800 cursor-pointer"
                    >
                      Chci{" "}
                      <a
                        href="#prototyp-balicek"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="underline decoration-blue-500 decoration-1 underline-offset-2 text-slate-900 hover:text-blue-600 transition-colors"
                      >
                        Prototypovací balíček
                      </a>
                    </label>
                  </div>
                </div>

                {/* File Upload Zone */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    {activeTab === "model" ? (
                      <span>
                        3D Model (.STEP, .STP, .STL, .3MF, .ZIP) <span className="text-slate-400 font-normal font-sans">(nepovinné)</span>
                      </span>
                    ) : (
                      <span>
                        Podklady k dílu <span className="text-slate-400 font-normal font-sans">(dobrovolné – fotka rozbitého dílu, náčrt s rozměry nebo PDF výkres)</span>
                      </span>
                    )}
                  </label>

                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition-all ${
                      isDragging
                        ? "border-blue-600 bg-blue-50/60"
                        : "border-slate-300 bg-white hover:border-blue-400"
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

                    <UploadCloud className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                    <p className="text-xs font-semibold text-slate-800 mb-0.5">
                      Přetáhněte soubory sem, nebo{" "}
                      <span className="text-blue-600 underline">vyberte z disku</span>
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Podporované formáty: {acceptedFormats} (max. 25 MB celkem)
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="mt-2 space-y-1.5">
                      {uploadedFiles.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-2 rounded-lg bg-white shadow-sm text-xs"
                        >
                          <div className="flex items-center gap-2 overflow-hidden pr-2">
                            <FileCheck2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span className="truncate text-slate-800">{item.file.name}</span>
                            <span className="text-slate-400 shrink-0">
                              ({(item.file.size / 1024).toFixed(1)} KB)
                            </span>
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

                {/* Description & Usage */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jaké bude využití a další popis
                  </label>
                  <textarea
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Popište k čemu díl slouží, kde bude použit, namáhání nebo požadovaný termín..."
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-xs sm:text-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
                  />
                </div>

                {status === "error" && (
                  <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-3.5 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    {status === "submitting" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Odesílám poptávku...</span>
                      </>
                    ) : (
                      <>
                        <span>Odeslat nezávaznou poptávku</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                  <p className="mt-2.5 text-center text-[11px] text-slate-500">
                    Odesláním poptávky berete na vědomí{" "}
                    <a
                      href="/ochrana-osobnich-udaju"
                      className="text-slate-600 hover:text-blue-600 underline underline-offset-2 transition-colors"
                    >
                      zpracování osobních údajů
                    </a>{" "}
                    a{" "}
                    <a
                      href="/obchodni-podminky"
                      className="text-slate-600 hover:text-blue-600 underline underline-offset-2 transition-colors"
                    >
                      obchodní podmínky
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
