import { Store, Product } from './types';

let stores: Store[] = [];
let currentStoreId = 1;

export function createStore(storeData: Omit<Store, 'id' | 'createdAt' | 'updatedAt'>): Store {
  const newStore: Store = {
    ...storeData,
    id: `store-${currentStoreId++}`,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  stores.push(newStore);
  return newStore;
}

export function getStoreById(id: string): Store | undefined {
  return stores.find(store => store.id === id);
}

export function getStoresByUserId(userId: string): Store[] {
  return stores.filter(store => store.userId === userId);
}

export function updateStore(id: string, updates: Partial<Store>): Store | undefined {
  const storeIndex = stores.findIndex(store => store.id === id);
  if (storeIndex === -1) return undefined;
  
  stores[storeIndex] = {
    ...stores[storeIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  return stores[storeIndex];
}

export function deleteStore(id: string): boolean {
  const initialLength = stores.length;
  stores = stores.filter(store => store.id !== id);
  return stores.length < initialLength;
}

export function publishStore(id: string): Store | undefined {
  return updateStore(id, { published: true });
}

export function unpublishStore(id: string): Store | undefined {
  return updateStore(id, { published: false });
}

export function getAllStores(): Store[] {
  return stores;
}

export function getStoreBySubdomain(subdomain: string): Store | undefined {
  return stores.find(store => store.subdomain === subdomain);
}

export function addProductToStore(storeId: string, product: Omit<Product, 'id' | 'storeId' | 'createdAt'>): Product | undefined {
  const store = getStoreById(storeId);
  if (!store) return undefined;
  
  const newProduct: Product = {
    ...product,
    id: `product-${Date.now()}-${Math.random()}`,
    storeId,
    createdAt: new Date()
  };
  
  store.products.push(newProduct);
  updateStore(storeId, { products: store.products });
  
  return newProduct;
}

export function updateProduct(storeId: string, productId: string, updates: Partial<Product>): Product | undefined {
  const store = getStoreById(storeId);
  if (!store) return undefined;
  
  const productIndex = store.products.findIndex(p => p.id === productId);
  if (productIndex === -1) return undefined;
  
  store.products[productIndex] = {
    ...store.products[productIndex],
    ...updates
  };
  
  updateStore(storeId, { products: store.products });
  return store.products[productIndex];
}

export function deleteProduct(storeId: string, productId: string): boolean {
  const store = getStoreById(storeId);
  if (!store) return false;
  
  const initialLength = store.products.length;
  store.products = store.products.filter(p => p.id !== productId);
  
  if (store.products.length < initialLength) {
    updateStore(storeId, { products: store.products });
    return true;
  }
  
  return false;
}
