import { db } from './firebase';

// User API

export const getInvoice = (id) =>
  db.ref('/invoices/' + id).once('value');

export const getClient = (id) =>
  db.ref('/clients/' + id).once('value');

export const getAllClients = () =>
  db.ref('/clients').once('value');


export const createClient = (businessName, contactName, location, phone) =>
  db.ref('/clients/').push({
    businessName,
    contactName,
    location,
    phone
  });

export const createInvoice = (obj) =>
  db.ref('/invoices/').push({
    clientId: obj.clientId,
    dateSent: obj.dateSent,
    paid: obj.paid,
    preparedBy: obj.preparedBy,
    productsServices: obj.productsServices
  });
