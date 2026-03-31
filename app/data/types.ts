// Rental type (for cho-thue listings)
export type RentalType = "nha-tro" | "can-ho" | "nha-rieng" | "phong-dv";

// Listing category
export type ListingCategory = "cho-thue" | "tim-phong";

// Listing status
export type ListingStatus = "active" | "hidden" | "deleted";

// Legacy types kept for compatibility
export type RoommateType = "have-room" | "find-partner";
export type PropertyType = "house" | "apartment";

// Landlord's preferences for tenants (on cho-thue listings)
export interface TenantPreferences {
  gender?: string[]; // ["male", "female", "any"]
  occupation?: string[]; // ["student", "worker", "any"]
  pets?: string[]; // ["no-pet", "pet-ok", "any"]
  smoking?: string[]; // ["no-smoke", "smoke-ok", "any"]
  cooking?: string[]; // ["no-cook", "cook-ok", "any"]
  other?: string;
}

// Cost structure for rental listings
export interface RoomCosts {
  rent?: string;
  deposit?: string;
  electricity?: string;
  water?: string;
  internet?: string;
  service?: string;
  parking?: string;
  management?: string;
  other?: string;
}

// Legacy roommate preferences (kept for backward compat)
export interface RoommatePreferences {
  gender?: string[];
  status?: string[];
  statusOther?: string;
  schedule?: string[];
  cleanliness?: string[];
  habits?: string[];
  pets?: string[];
  moveInTime?: string[];
  other?: string;
}

// Main listing interface
export interface RoomListing {
  id: number | string;
  title: string;
  author: string;
  price: string;
  location: string;
  locationNegotiable?: boolean;
  moveInDate: string;
  timeNegotiable?: boolean;
  description: string;
  phone: string;
  zalo?: string;
  facebook?: string;
  instagram?: string;
  postedDate: string;
  category: ListingCategory;
  // Rental type (for cho-thue listings)
  rentalType?: RentalType;
  // Legacy property type
  propertyType?: PropertyType;
  propertyTypes?: string[];
  image?: string;
  userId?: string;
  status?: ListingStatus;
  introduction?: string;
  images?: string[];
  amenities?: string[];
  amenitiesOther?: string;
  // Tenant preferences (landlord's requirements for tenants)
  tenantPreferences?: TenantPreferences;
  // Legacy roommate preferences
  preferences?: RoommatePreferences;
  costs?: RoomCosts;
  roomSize?: string;
  floor?: string;
  totalFloors?: string;
  bathrooms?: string;
  currentOccupants?: string;
  minContractDuration?: string;
  isDraft?: boolean;
}

// Lifestyle preferences interface (for user profile)
export interface LifestylePreferences {
  schedule?: string[];
  cleanliness?: string[];
  habits?: string[];
  otherHabits?: string;
}

// User profile interface
export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  gender?: string;
  birthYear?: string;
  occupation?: string;
  lifestyle?: LifestylePreferences;
  createdAt?: string;
  updatedAt?: string;
}
