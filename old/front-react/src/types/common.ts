export interface medicine {
  name: string;
  type: string;
  code: number;
  price: number;
  unit_price: number;
  quantity: number;
  category: string;
  unit: string;
  supplier: string;
  expiration: number;
}

export interface modalType {
  name: string;
  isOpen: boolean;
}

export interface PurchaseItems {
  medicineName: string;
  supplierPrice:number ;
  SellPrice: number ;
  quantity: number;
  expireDate: number;
  discount: number;
  total: number;
}
