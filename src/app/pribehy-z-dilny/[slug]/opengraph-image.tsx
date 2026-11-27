import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { caseStudiesData, getCaseStudy } from "@/lib/caseStudies";

export const alt = "Příběhy z dílny 3D Spline";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return caseStudiesData.map((cs) => ({ slug: cs.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) {
    return new Response("Not found", { status: 404 });
  }

  // Fotka příběhu z public/ jako data URL (cesty mohou obsahovat %20).
  const file = path.join(process.cwd(), "public", decodeURIComponent(study.heroImage));
  const buffer = await readFile(file);
  const photo = `data:image/jpeg;base64,${buffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0F1E2E",
          color: "#FFFFFF",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 640,
            height: "100%",
            padding: "64px 56px 64px 72px",
          }}
        >
          <div style={{ display: "flex", fontSize: 28, color: "#93C5FD" }}>
            Příběhy z dílny • 3D Spline
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontSize: 24,
                padding: "8px 20px",
                borderRadius: 999,
                background: "#1D4ED8",
                marginBottom: 28,
              }}
            >
              {study.tag}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 62,
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              {study.title}
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#94A3B8" }}>
            3dspline.cz
          </div>
        </div>
        <div style={{ display: "flex", width: 560, height: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo}
            alt=""
            width={560}
            height={630}
            style={{ width: 560, height: 630, objectFit: "cover" }}
          />
        </div>
      </div>
    ),
    { ...size },
  );
}
