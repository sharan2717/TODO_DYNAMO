
export interface Product {
    productID:string;
    productName : string;
    ProductDescription:string;
    quantity  : number;
    price  : number
}

export interface CardDetails {
    card_number: string;
    card_cvc: string;
    card_expiry: string;
}

export interface OrderDetails {
    orderID: string;
    productID:string;
    status : string;
    quantity  : number;
    orderDate : string;
    card_details: CardDetails;
}



export interface PaymentStatus {
    status: string;
    transaction_id?: string;
    reason?: string;
}