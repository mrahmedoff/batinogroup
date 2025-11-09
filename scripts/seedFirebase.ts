// Firebase-ə test məlumatları əlavə etmək üçün script
// Bu faylı development zamanı istifadə edin

import { addCategory } from '@/lib/firebase/categories';
import { addProduct } from '@/lib/firebase/products';

export const seedCategories = async () => {
  console.log('Adding sample categories...');
  
  try {
    // Products menu üçün əsas kateqoriyalar
    const sparePartsId = await addCategory({
      name: 'SPARE PARTS GROUP',
      type: 'main',
      description: 'Industrial spare parts and components',
      status: 'active',
      order: 1,
      menuType: 'products'
    });

    const productsId = await addCategory({
      name: 'PRODUCTS',
      type: 'main', 
      description: 'Main industrial products and equipment',
      status: 'active',
      order: 2,
      menuType: 'products'
    });

    const devicesId = await addCategory({
      name: 'DEVICES & PRODUCT',
      type: 'main',
      description: 'Advanced monitoring and analysis devices',
      status: 'active',
      order: 3,
      menuType: 'products'
    });

    // Alt kateqoriyalar - Spare Parts
    await addCategory({
      name: 'Bearings Group',
      type: 'sub',
      parentId: sparePartsId,
      description: 'All types of industrial bearings',
      status: 'active',
      order: 1,
      menuType: 'products'
    });

    await addCategory({
      name: 'Belts Group',
      type: 'sub',
      parentId: sparePartsId,
      description: 'Industrial belts and transmission components',
      status: 'active',
      order: 2,
      menuType: 'products'
    });

    await addCategory({
      name: 'Valves Group',
      type: 'sub',
      parentId: sparePartsId,
      description: 'Industrial valves and control systems',
      status: 'active',
      order: 3,
      menuType: 'products'
    });

    // Alt kateqoriyalar - Products
    await addCategory({
      name: 'Slurry Pump',
      type: 'sub',
      parentId: productsId,
      description: 'Heavy duty slurry pumps for mining',
      status: 'active',
      order: 1,
      menuType: 'products'
    });

    await addCategory({
      name: 'Flotation Cells',
      type: 'sub',
      parentId: productsId,
      description: 'Flotation equipment for mineral processing',
      status: 'active',
      order: 2,
      menuType: 'products'
    });

    // Alt kateqoriyalar - Devices
    await addCategory({
      name: 'Vibration Analyzer',
      type: 'sub',
      parentId: devicesId,
      description: 'Vibration analysis and monitoring devices',
      status: 'active',
      order: 1,
      menuType: 'products'
    });

    console.log('Categories added successfully!');
    return { sparePartsId, productsId, devicesId };
    
  } catch (error) {
    console.error('Error adding categories:', error);
    throw error;
  }
};

export const seedProducts = async (categoryIds: any) => {
  console.log('Adding sample products...');
  
  try {
    // Sample products
    await addProduct({
      name: 'SKF Bearing 6205',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      description: 'High quality SKF bearing for industrial applications',
      price: 25.99,
      status: 'active',
      sku: 'SKF-6205-001'
    });

    await addProduct({
      name: 'Industrial V-Belt',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      description: 'Heavy duty V-belt for industrial machinery',
      price: 45.50,
      status: 'active',
      sku: 'BELT-V-150'
    });

    await addProduct({
      name: 'Grundfos Slurry Pump CR32',
      category: categoryIds.productsId,
      subcategory: 'Slurry Pump',
      description: 'Heavy duty slurry pump for mining operations',
      price: 1250.00,
      status: 'active',
      sku: 'PUMP-CR32-001'
    });

    await addProduct({
      name: 'Fluke Vibration Analyzer',
      category: categoryIds.devicesId,
      subcategory: 'Vibration Analyzer',
      description: 'Professional vibration analysis device',
      price: 2500.00,
      status: 'active',
      sku: 'FLUKE-VIB-001'
    });

    console.log('Products added successfully!');
    
  } catch (error) {
    console.error('Error adding products:', error);
    throw error;
  }
};

// Bütün test məlumatlarını əlavə et
export const seedAll = async () => {
  try {
    const categoryIds = await seedCategories();
    await seedProducts(categoryIds);
    console.log('All sample data added successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};