export interface Rate {
  id: number;
  name: string;
  amount: number;
  status: "ACTIVE" | "INACTIVE";
}