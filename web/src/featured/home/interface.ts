type CountdownLabel = "Days" | "Hours" | "Minutes" | "Seconds";

export interface CountdownType {
  time: number;
  label: CountdownLabel;
}
