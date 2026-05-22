export type TourCategory = "city" | "adventure" | "nature" | "culture" | "food";

export interface TourStop {
  time: string;
  location: string;
  description: string;
}

export interface Tour {
  id: string;
  slug: TourCategory;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  duration: string;
  pricePerPerson: number;
  minPersons: number;
  maxPersons: number;
  highlights: string[];
  includes: string[];
  itinerary: TourStop[];
  popular?: boolean;
}
