export type VehicleCategory = "limousines" | "suvs" | "exotic";

export interface Vehicle {
  id: string;
  category: VehicleCategory;
  name: string;
  tagline: string;
  image: string;
  gallery: string[];
  passengers: number;
  luggage: number;
  hourlyRate: number;
  perMileRate: number;
  freeMiles: number;
  features: string[];
  specs: {
    make: string;
    model: string;
    year: number;
    color: string;
    mpg?: string;
  };
  available: boolean;
  popular?: boolean;
}
