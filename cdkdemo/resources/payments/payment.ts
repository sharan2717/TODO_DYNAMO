
import {CardDetails,OrderDetails,PaymentStatus} from '../dtos/models';
import {decreaseQuantity, UpdateOrderStatus} from '../db/dynamodb';
import { v4 as uuidv4 } from 'uuid';

export function validateCard( card_details:CardDetails){

    const cardNumberValid = /^\d{16}$/.test(card_details.card_number);
    const cardCvcValid = /^\d{3,4}$/.test(card_details.card_cvc);
    const cardExpiryValid = /^(0[1-9]|1[0-2])\/\d{2}$/.test(card_details.card_expiry);
    return cardNumberValid && cardCvcValid && cardExpiryValid;
}

export async function confirmOrder( order_details:OrderDetails){
 
   
      try{
        await UpdateOrderStatus(order_details.orderID,"Order Placed")
         const response :PaymentStatus={
           status:"Order Placed",
           transaction_id:uuidv4()
         }
         return  response;
      }catch(err){
        return  err;

      }



}

export async function cancelOrder( order_details:OrderDetails){
    try{
        await decreaseQuantity(order_details.productID,order_details.quantity);
        await UpdateOrderStatus(order_details.orderID,"Order Declined")
         const response :PaymentStatus={
           status:"Order Declined",
           reason:"Invalid Card"
         }
         return  response;
      }catch(err){
        
          return  err;
      }


}