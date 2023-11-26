import OrderInterface, { ChangeOrderBody, ChangeStatusBody, OrderEnum, OrderStatusEnum } from "../types/Order.js"
import orderDal from '../dal/orderDal.js'
// import serverCheckOrder from "./serverCheckOrder.js"
// import ProductsQuantities from "../types/ProductsQuantities.js"
import mongoose from "mongoose"
import isEnumValue from "./isEnumValue.js"
import { ProductQuantity } from "../types/ProductsQuantities.js"
import RequestError from "../utils/RequestError.js"
import STATUS_CODES from "../utils/StatusCodes.js"


const addOrder = async (order: OrderInterface) => {

    if (!isEnumValue(order.status, OrderStatusEnum)) {
        const validStatusValues = Object.values(OrderStatusEnum).join(', ');
        throw new RequestError(`The value in the field: status can only receive one of the following strings: 'Waiting' | 'Sent' | 'Received' | 'Canceled', not: ${validStatusValues}`,
            STATUS_CODES.BAD_REQUEST);
    }
    if (!isEnumValue(order.shippingDetails.orderType, OrderEnum)) {
        const validOrderTypeValues = Object.values(OrderEnum).join(', ');
        throw new RequestError(`The value in the field: order.shippingDetails.orderType can only receive one of the following strings: 'Express' | 'Regular' | 'SelfCollection', not: ${validOrderTypeValues}`,
            STATUS_CODES.BAD_REQUEST);
    }
    const productsQuantities = {
        productsArray: order.cartItems,
        action: "buy"
    }
    // await serverCheckOrder.getAndSetQuantity(productsQuantities)
    const result = await orderDal.addOrder(order)
    if (!result) {
        throw new Error('Something went wrong while placing the order, please try again')
    }
    else {
        // const productsQuantitiesArray = serverCheckOrder.creatProductsQuantitiesArray(order.cartItems)

        // const response = await serverCheckOrder.getAndSetQuantity(productsQuantitiesArray)
        // if (response) {
        //     const result = await orderDal.addOrder(order)
        if (!result) {
            throw new RequestError('Something went wrong while placing the order, please try again', STATUS_CODES.INTERNAL_SERVER_ERROR)
        }
        else {
            return result;
        }
    }
}



const getOrdersByUserId = async (userId: string): Promise<OrderInterface[]> => {

    const result = await orderDal.getOrdersByUserId(userId);

    if (!result) {
        throw new RequestError(`there is no such a user number: ${userId}`, STATUS_CODES.BAD_REQUEST)
    }
    return result;

};


const getOrders = async () => {

    const result = await orderDal.getOrders()

    if (!Object.keys(result).length) {
        throw new RequestError("Something went wrong with the request, please try again", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
    else {
        return result;
    }
}

// const updateOrders = async (
//     orderId: mongoose.Types.ObjectId,
//     changeOrderBody: ChangeOrderBody
// ): Promise<OrderInterface | OrderInterface[] | null | ProductQuantity[] | undefined> => {

//     const result = await orderDal.updateOrders(orderId, changeOrderBody)

//     if (!Object.keys(result!).length) {
//         throw new Error("Something went wrong with the request, please try again")
//     }
//     else {
//         return result;
//     }
// }


export default { addOrder, getOrdersByUserId, getOrders }
