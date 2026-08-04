import express, { Router } from 'express';
import { PrismaClient } from '../generated/client/client.js';

// Your Personal PayPal Verified Endpoint
const PERSONAL_PAYPAL_EMAIL = process.env.PERSONAL_PAYPAL_EMAIL;

export const createPaypalRouter = (prisma: PrismaClient): Router => {
  const router = express.Router();

  router.post('/api/checkout/paypal-webhook', async (req, res) => {
    const event = req.body;

    // Verify the payment is completed and sent directly to your personal account
    if (event.event_type === 'PAYMENT.SALE.COMPLETED') {
      const sale = event.resource;
      const recipientEmail = sale.payee_payment_email_address || sale.receiver_email;
      
      if (!PERSONAL_PAYPAL_EMAIL || recipientEmail.toLowerCase() !== PERSONAL_PAYPAL_EMAIL.toLowerCase()) {
        return res.status(400).json({ error: 'Security Alert: Payment routing mismatch.' });
      }

      const buyerEmail = sale.custom || (sale.payer && sale.payer.payer_info ? sale.payer.payer_info.email : null);
      const amountPaid = parseFloat(sale.amount.total);
      const trackId = sale.invoice_number; // Mapped to your master track ID

      // Record transaction and lock in the buyer's email for your marketing list
      await prisma.transaction.create({
        data: {
          trackId: trackId,
          buyerEmail: buyerEmail || 'unknown@example.com',
          licenseType: sale.item_list && sale.item_list.items ? sale.item_list.items[0].name : 'Standard Lease',
          amountPaid: amountPaid,
          paymentGateway: 'PayPal (Personal Direct)',
          licensePdfUrl: `/vault_storage/licenses/license_${Date.now()}.pdf`
        }
      });

      return res.status(200).json({ success: true, routedTo: 'Personal PayPal Secure' });
    }

    res.status(400).json({ received: true });
  });

  return router;
};
