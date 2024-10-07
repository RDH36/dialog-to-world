import { cn } from "@/lib/utils";

type LoadingProps = {
  className?: string;
  title?: string;
  type?: "normal" | "page";
};

export default function LoadButton({
  className,
  title,
  type = "page",
}: LoadingProps) {
  if (type === "normal") {
    return (
      <div className={cn(className, "flex items-center justify-center")}>
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.001-3.647zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm5.657-5.657a7.963 7.963 0 01-2.022 1.325l-3.01 3.655A7.94 7.94 0 0012 20v-4a4 4 0 003.657-5.657z"
          ></path>
        </svg>
        <span className={cn("text-indigo-500 text-lg font-medium")}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <svg
        className="animate-spin -ml-1 mr-3 h-7 w-7 text-primary"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3.001-3.647zM12 20a8 8 0 008-8h-4a4 4 0 01-4 4v4zm5.657-5.657a7.963 7.963 0 01-2.022 1.325l-3.01 3.655A7.94 7.94 0 0012 20v-4a4 4 0 003.657-5.657z"
        ></path>
      </svg>
      <span className={cn(className, "text-indigo-500 text-lg font-medium")}>
        {title}
      </span>
    </div>
  );
}
