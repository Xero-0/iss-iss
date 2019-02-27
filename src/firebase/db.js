import { db } from './firebase';

// User API

export const getInvoice = (id) =>
  db.ref('/invoices/' + id).once('value');

export const getClient = (id) =>
  db.ref('/clients/' + id).once('value');

export const createClient = (businessName, contactName, location, phone) =>
  db.ref('/clients/').push({
    businessName,
    contactName,
    location,
    phone
  });

export const createInvoice = (clientId, dateSent, paid, preparedBy) =>
  db.ref('/invoices/').push({
    clientId,
    dateSent,
    paid,
    preparedBy
  });
