export type IconName =
  | "code"
  | "android"
  | "pen"
  | "film"
  | "trophy"
  | "gamepad"
  | "chip"
  | "layers";

export function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: IconName;
  className?: string;
}) {
  const p = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "code":
      return (
        <svg {...p}>
          <path d="m8 7-5 5 5 5M16 7l5 5-5 5M14 4l-4 16" />
        </svg>
      );
    case "android":
      return (
        <svg {...p}>
          <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
          <path d="M11 18.5h2M10 6h4" />
        </svg>
      );
    case "pen":
      return (
        <svg {...p}>
          <path d="M4 20l4-1 11-11a2.1 2.1 0 0 0-3-3L5 16l-1 4ZM14 7l3 3" />
        </svg>
      );
    case "film":
      return (
        <svg {...p}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <path d="M7 4v16M17 4v16M3 9h4M3 15h4M17 9h4M17 15h4" />
        </svg>
      );
    case "trophy":
      return (
        <svg {...p}>
          <path d="M8 4h8v5a4 4 0 0 1-8 0V4ZM8 6H4v1a4 4 0 0 0 4 4M16 6h4v1a4 4 0 0 1-4 4M12 13v4M8 21h8M9.5 17h5" />
        </svg>
      );
    case "gamepad":
      return (
        <svg {...p}>
          <path d="M7 8h10a4.5 4.5 0 0 1 4.4 5.4l-.7 3.4a2.4 2.4 0 0 1-4 1.3L15 16.5H9l-1.7 1.6a2.4 2.4 0 0 1-4-1.3l-.7-3.4A4.5 4.5 0 0 1 7 8ZM8 10.5v3M6.5 12h3M15.5 11.5h.01M17.5 13.5h.01" />
        </svg>
      );
    case "chip":
      return (
        <svg {...p}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <rect x="9.5" y="9.5" width="5" height="5" rx="1" />
          <path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4" />
        </svg>
      );
    case "layers":
      return (
        <svg {...p}>
          <path d="m12 3 9 5-9 5-9-5 9-5ZM3 13l9 5 9-5M3 17.5l9 5 9-5" />
        </svg>
      );
  }
}
