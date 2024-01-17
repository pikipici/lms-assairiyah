import { cn } from "@/lib/utils";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface CourseProgressProps {
  value: any;
  variant?: "default" | "success";
  size?: "default" | "sm";
}

const colorByVariant = {
  default: "text-sky-700",
  success: "text-emerald-700",
};

const sizeByVariant = {
  default: "text-sm",
  sm: "text-xs",
};

export const CircleProgress = ({
  value,
  variant,
  size,
}: CourseProgressProps) => {
  return (
    <div>
      <div className="mx-auto">
        <CircularProgress value={value} color="green.400">
          <CircularProgressLabel>{Math.round(value)} %</CircularProgressLabel>
        </CircularProgress>
      </div>
      <p
        className={cn(
          "font-medium mt-2 text-sky-700",
          colorByVariant[variant || "default"],
          sizeByVariant[size || "default"]
        )}
      >
        Complete
      </p>
    </div>
  );
};
