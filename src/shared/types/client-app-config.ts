export type ClientAppConfig = {
  id: number;
  averageDeliveryCost?: number;
  freeDeliveryIncluded?: boolean;
  freeDeliveryThreshold?: number;
  openTime?: string;
  closeTime?: string;
  disabled?: boolean;
  location?: string;
};
