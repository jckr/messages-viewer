import styles from "@/styles/Charts.module.css";
import { MouseEventHandler } from "react";
type SummaryTimeButtonProps = {
  label: string;
  onClick: MouseEventHandler<HTMLDivElement>;
};

export default function SummaryTimeButton({
  label,
  onClick,
}: SummaryTimeButtonProps) {
  return (
    <div className={styles["summary-time-button"]} onClick={onClick}>
      {label}
    </div>
  );
}
