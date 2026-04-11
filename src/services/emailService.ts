import emailjs from '@emailjs/browser';
import { Order } from '../types';

const SERVICE_ID = 'service_onh66tg';
const TEMPLATE_ID = 'template_y7i6m1x';
const PUBLIC_KEY = 'Chv0hT9SPcvmFqCY8';

export const sendOrderEmail = async (order: Order) => {
  const orderItemsString = order.items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(', ');

  const templateParams = {
    name: order.customer.name,
    phone: order.customer.phone,
    order: orderItemsString,
    total: order.total,
    address: order.customer.address,
    email: 'rdzxyzm@gmail.com', // As per user request for testing/recipient
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    console.log('Email sent successfully!', response.status, response.text);
    return response;
  } catch (error) {
    console.error('Failed to send email:', error);
    throw error;
  }
};
