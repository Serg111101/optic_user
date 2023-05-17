import { shippingOptionParameters } from './ShippingOptions';

export const paymentRequest: google.payments.api.PaymentDataRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['MASTERCARD', 'VISA']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          'gateway': 'stripe',
          'stripe:version': '2018-10-31',
          'stripe:publishableKey': 'pk_test_51MtSI5BHtFxBxt39nRlwbpAeDB2t3LZZdsewc1V2MfQzadOUhktJb5VdbAYa0eytI2MxEL9W5BJxzPeNfPmMEGub00Cv17hmk0'
        }
      }
    }
  ],
  merchantInfo: {
    merchantId: 'BCR2DN4T4TZI7XAK', // Test merchant ID provided by Google
    merchantName: 'Demo Only (you will not be charged)'
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPriceLabel: 'Total',
    totalPrice: '0', // Force this to be zero for the sample app
    currencyCode: 'USD',
    countryCode: 'US'
  },
  shippingAddressRequired: true,
  shippingOptionParameters: shippingOptionParameters,
  shippingOptionRequired: true,
  callbackIntents: ['SHIPPING_ADDRESS', 'SHIPPING_OPTION']
};