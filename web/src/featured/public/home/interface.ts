type CountdownLabel = "Days" | "Hours" | "Minutes" | "Seconds";

export interface CountdownType {
  time: number;
  label: CountdownLabel;
}

export interface Eip1193Provider {
  request: (args: {
    method: string;
    params?: unknown[] | object;
  }) => Promise<unknown>;
}