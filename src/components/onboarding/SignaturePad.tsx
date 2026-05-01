import * as React from "react";
import SignatureCanvas from "react-signature-canvas";
import { cn } from "@/lib/utils";

export interface SignaturePadHandle {
  /** Returns the trimmed signature as a PNG data URL, or null if empty. */
  getDataUrl: () => string | null;
  isEmpty: () => boolean;
  clear: () => void;
  undo: () => void;
}

interface SignaturePadProps {
  onChange?: (isEmpty: boolean) => void;
  className?: string;
}

/**
 * Drawn signature pad. Uses react-signature-canvas with touch-action:none on
 * the wrapper so mobile users can sign without scrolling the page.
 */
export const SignaturePad = React.forwardRef<SignaturePadHandle, SignaturePadProps>(
  function SignaturePad({ onChange, className }, ref) {
    const sigRef = React.useRef<SignatureCanvas | null>(null);
    const wrapperRef = React.useRef<HTMLDivElement | null>(null);
    const [canvasWidth, setCanvasWidth] = React.useState(0);

    // Resize canvas to wrapper width while preserving aspect height.
    React.useEffect(() => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;
      const update = () => setCanvasWidth(wrapper.clientWidth);
      update();
      const ro = new ResizeObserver(update);
      ro.observe(wrapper);
      return () => ro.disconnect();
    }, []);

    React.useImperativeHandle(
      ref,
      () => ({
        getDataUrl: () => {
          const sig = sigRef.current;
          if (!sig || sig.isEmpty()) return null;
          // getTrimmedCanvas crops to drawn area for a cleaner PDF embed
          return sig.getTrimmedCanvas().toDataURL("image/png");
        },
        isEmpty: () => sigRef.current?.isEmpty() ?? true,
        clear: () => {
          sigRef.current?.clear();
          onChange?.(true);
        },
        undo: () => {
          const sig = sigRef.current;
          if (!sig) return;
          const data = sig.toData();
          if (data && data.length > 0) {
            data.pop();
            sig.fromData(data);
            onChange?.(sig.isEmpty());
          }
        },
      }),
      [onChange],
    );

    return (
      <div className={cn("w-full", className)}>
        <div
          ref={wrapperRef}
          className="rounded-2xl border border-navy bg-white p-4"
          style={{ touchAction: "none" }}
        >
          {canvasWidth > 0 ? (
            <SignatureCanvas
              ref={sigRef}
              clearOnResize={false}
              penColor="#0F2547"
              backgroundColor="rgba(255,255,255,1)"
              canvasProps={{
                width: canvasWidth - 32, // account for padding
                height: typeof window !== "undefined" && window.innerWidth < 768 ? 200 : 240,
                className: "rounded-xl",
                "aria-label": "Signature pad — draw your signature",
              }}
              onEnd={() => onChange?.(sigRef.current?.isEmpty() ?? true)}
            />
          ) : (
            <div className="h-[200px] md:h-[240px]" />
          )}
        </div>
      </div>
    );
  },
);
