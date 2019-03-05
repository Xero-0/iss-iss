import { db } from './firebase';

// User API

export const getInvoice = (id) =>
  db.ref('/invoices/' + id).once('value');

export const getClient = (id) =>
  db.ref('/clients/' + id).once('value');

export const getAllClients = () =>
  db.ref('/clients').once('value');

export const getAllInvoices = () =>
  db.ref('/invoices').once('value');


export const createClient = (clientObj) =>
  db.ref('/clients/').push({
    businessName: clientObj.businessName,
    contactName: clientObj.contactName,
    location: clientObj.location,
    phone: clientObj.phone
  });
export const updateClient = (id, obj) =>
  db.ref(`/clients/${id}`).set({
    businessName: obj.businessName,
    contactName: obj.contactName,
    location: obj.location,
    phone: obj.phone
  });
export const createInvoice = (obj) =>
  db.ref('/invoices/').push({
    clientId: obj.clientId,
    dateSent: obj.dateSent,
    paid: obj.paid,
    preparedBy: obj.preparedBy,
    productsServices: obj.productsServices
  });

export const updateInvoice = (id, obj) =>
  db.ref(`/invoices/${id}`).set({
    clientId: obj.clientId,
    dateSent: obj.dateSent,
    paid: obj.paid,
    preparedBy: obj.preparedBy,
    productsServices: obj.productsServices
  });
