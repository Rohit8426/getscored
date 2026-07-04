// Type declaration for LottieFiles' <dotlottie-wc> web component.
// Loaded globally via a <script type="module"> tag (see layout.tsx snippet) —
// no npm package needed, so TypeScript just needs to know the tag is valid JSX.
//
// React 19 / @types/react 19 moved the JSX namespace inside `React`, so it
// must be augmented via `declare module "react"`, not `declare global { namespace JSX }`
// (the old pattern silently fails to merge under the new types).
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type DotLottieProps = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
  src?: string;
  autoplay?: boolean;
  loop?: boolean;
  speed?: string | number;
  mode?: "forward" | "reverse" | "bounce" | "reverse-bounce";
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "dotlottie-wc": DotLottieProps;
    }
  }
}

export {};