import { db } from './firebase';

// User API

export const getInvoice = (id) =>
  db.ref('/invoices/' + id).once('value');

export const getClient = (id) =>
  db.ref('/clients/' + id).once('value');

