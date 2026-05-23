import { lazy, Suspense, useEffect, useRef, useState } from "react";
import heroSpheres from "@/assets/hero-spheres.png";
import type { MatrixStage } from "./MatrixCanvas";

const MatrixCanvas = lazy(() =>
  import("./MatrixCanvas").then((m) => ({ default: m.MatrixCanvas })),
);

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function LazyMatrix({
  count = 80,
  showTooltip = true,
  className = "",
  stage,
}: {
  count?: number;
  showTooltip?: boolean;
  className?: string;
  stage?: MatrixStage;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!ref.current || reduced) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className={`relative w-full h-full ${className}`}>
      {reduced || !visible ? (
        <img
          src={heroSpheres}
          alt=""
          aria-hidden
          className="w-full h-full object-cover opacity-70"
        />
      ) : (
        <Suspense
          fallback={
            <img
              src={heroSpheres}
              alt=""
              aria-hidden
              className="w-full h-full object-cover opacity-70"
            />
          }
        >
          <MatrixCanvas count={count} showTooltip={showTooltip} stage={stage} />
        </Suspense>
      )}
    </div>
  );
}

export default LazyMatrix;