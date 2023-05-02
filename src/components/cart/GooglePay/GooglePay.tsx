import { paymentRequest } from '../../../Config/GooglePay';
import { shippingOptions } from '../../../Config/ShippingOptions';
import '../cart.scss'

function calculateTotalPrice(displayItems: google.payments.api.DisplayItem[]): number {
  return displayItems.reduce((total, item) => total + Number(item.price), 0);
}
function buildPaymentRequest(displayItems: google.payments.api.DisplayItem[]): google.payments.api.PaymentDataRequest {
  return {
    ...paymentRequest,
    transactionInfo: {
      ...paymentRequest.transactionInfo,
      displayItems: [...displayItems],
      totalPrice: calculateTotalPrice(displayItems).toFixed(2)
    }
  };
}
function getUpdatedPaymentData(
  paymentRequest: google.payments.api.PaymentDataRequest,
  paymentData: google.payments.api.IntermediatePaymentData
): google.payments.api.PaymentDataRequestUpdate {
  if (paymentData.shippingOptionData?.id) {
    const shippingOption = shippingOptions.find(option => option.id === paymentData.shippingOptionData!.id);

    if (shippingOption) {
      const displayItems: google.payments.api.DisplayItem[] = [
        ...(paymentRequest.transactionInfo.displayItems || []),
        {
          label: shippingOption.label,
          price: shippingOption.price.toFixed(2),
          type: 'SHIPPING_OPTION'
        }
      ];

      return {
        newTransactionInfo: {
          ...paymentRequest.transactionInfo,
          totalPrice: calculateTotalPrice(displayItems).toFixed(2),
          displayItems
        }
      };
    }
  }

  return {};
}

export { buildPaymentRequest, getUpdatedPaymentData };