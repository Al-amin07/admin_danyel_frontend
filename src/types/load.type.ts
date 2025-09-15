import { IDriver } from "./driver.type";

export const LoadStatusArray = [
  "Pending Assignment",
  "Assigned",
  "In Transit",
  "At Pickup",
  "En Route to Pickup",
  "Delivered",
  "Cancelled",
] as const;
export const LoadPaymentStatusArray = ["PENDING", "PAID", "REJECTED"] as const;

export type TLoadStatus = (typeof LoadStatusArray)[number];
export type TLoadPaymentStatus = (typeof LoadPaymentStatusArray)[number];

// 🔹 Type from the array
export type LoadStatus = (typeof LoadStatusArray)[number];

// Address Type
export interface IAddress {
  street: string;
  apartment?: string;
  city: string;
  state: string;
  zipCode: number;
  country: string;
}

export interface IDocument {
  type: string;
  url: string;
  createdAt: string;
}

export interface ICustomer {
  name: string;
  email: string;
  phone?: string;
}

export interface IStatusTimeline {
  status: TLoadStatus;
  timestamp: Date;
  notes?: string;
  expectedDeliveryDate?: Date;
}

export interface ILoad {
  _id: string;
  loadId: string;
  quantity: number;
  weight: number;
  rating?: number;
  loadType: string;
  specialInstructions?: string;

  loadStatus: TLoadStatus;

  pickupAddress: IAddress;
  deliveryAddress: IAddress;

  pickupDate?: Date;
  pickupTime?: string;
  deliveryDate?: Date;
  deliveryTime?: string;

  totalDistance: number;
  ratePerMile: number;
  totalPayment: number;

  paymentStatus: TLoadPaymentStatus;
  customerNotes?: string;
  paymentDate?: Date;
  companyId: string;
  assignedDriver?: IDriver;
  statusTimeline: IStatusTimeline[];
  customer: ICustomer;

  documents: IDocument[];
  createdAt: Date;
  updatedAt: Date;
}
