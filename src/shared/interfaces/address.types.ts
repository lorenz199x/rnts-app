export interface TGetAddressScheme {
  userId: string;
  addressID: string;
  recipientName: string;
  recipientContactNumber: string;
  province: string;
  city: string;
  barangay: string;
  houseFloorNumberStreet: string;
  zipCode: string;
  landmark: string;
  locationType: string;
  defaultAddress: boolean;
  createdAt: Date;
  createdBy: string;
}

export type TGetAddressResponse = {
  getDeliveryAddressbyId: TGetAddressScheme[];
};
