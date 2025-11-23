// Script to add test data to Firebase
// Bu faylı development zamanı istifadə edin

import { addCategory } from '@/lib/firebase/categories';
import { addProduct } from '@/lib/firebase/products';

export const seedCategories = async () => {
  console.log('Adding sample categories...');
  
  try {
    // Main categories for Products menu
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
      description: 'IMEC Bearings Group offers a comprehensive range of high-quality bearings designed to meet the diverse requirements of various industries. Our product lineup includes:\n\n• Ball Bearings\n• Roller Bearings\n• Thrust Bearings\n• Needle Bearings\n• Spherical Bearings\n• Tapered Roller Bearings\n• Angular Contact Bearings\n• Deep Groove Ball Bearings\n• Pillow Block Bearings\n• Flange Bearings\n\nEach bearing is engineered for optimal performance, durability, and reliability, ensuring efficient and seamless operations across all applications. Trust IMEC Bearings Group for superior bearing solutions tailored to your specific requirements.',
      status: 'active',
      order: 1,
      menuType: 'products'
    });

    await addCategory({
      name: 'Belts Group',
      type: 'sub',
      parentId: sparePartsId,
      description: 'IMEC Belt Group offers a diverse range of high-quality belts designed to meet the needs of various industries. Our product lineup includes:\n\n• Cleated Belt Conveyors\n• Filter Belts\n• V-Belts\n• Round Belts\n• Flat Belts\n• Rubber Belts\n• Timing Belts\n• Belt Drives\n• Balata Belts\n• Synchronous Belts\n• Cross Belt Drive\n• Jockey Pulley\n• Light Duty Conveyors\n• Quarter Turn Drive\n• Stepped Cone Pulley\n• Conveyer Belt\n\nEach type of belt is engineered for optimal performance, durability, and reliability, ensuring efficient and seamless operations across all applications. Trust IMEC Belt Group for superior belt solutions tailored to your specific requirements.',
      status: 'active',
      order: 2,
      menuType: 'products'
    });

    await addCategory({
      name: 'Valves Group',
      type: 'sub',
      parentId: sparePartsId,
      description: 'IMEC Valve Group offers a wide range of high-quality valves designed to meet the diverse requirements of various industries. Our product lineup includes:\n\n• Knife Valves\n• Pinch Valves\n• Diaphragm Valves\n• Plug Valves\n• Butterfly Valves\n• Ball Valves\n• Check valves\n• Filter and Strainers\n• Needle Valves\n• Gate Valves\n• Globe Valves\n• Segment Valves\n• Control Valves\n• Safety Valves\n• Pressure Reducers\n• Blasting Discs\n• Electric Actuators\n• Pneumatic Actuators\n• Positioners\n• Solenoid Valves\n• Limit Switch Box\n\nEach valve is engineered for precision, durability, and reliability, ensuring efficient flow control and seamless operation. Trust IMEC Valve Group for all your valve solutions, tailored to your specific needs.',
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
    // Bearings Group products
    await addProduct({
      name: 'SKF Bearing 6205',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Ball Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Roller Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Thrust Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Needle Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Spherical Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Tapered Roller Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Angular Contact Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Deep Groove Ball Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Pillow Block Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    await addProduct({
      name: 'Flange Bearings',
      category: categoryIds.sparePartsId,
      subcategory: 'Bearings Group',
      status: 'active'
    });

    // Belts Group products
    await addProduct({
      name: 'Industrial V-Belt',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Cleated Belt Conveyors',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Filter Belts',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Round Belts',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Flat Belts',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Rubber Belts',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Timing Belts',
      category: categoryIds.sparePartsId,
      subcategory: 'Belts Group',
      status: 'active'
    });

    await addProduct({
      name: 'Grundfos Slurry Pump CR32',
      category: categoryIds.productsId,
      subcategory: 'Slurry Pump',
      status: 'active'
    });

    await addProduct({
      name: 'Fluke Vibration Analyzer',
      category: categoryIds.devicesId,
      subcategory: 'Vibration Analyzer',
      status: 'active'
    });

    console.log('Products added successfully!');
    
  } catch (error) {
    console.error('Error adding products:', error);
    throw error;
  }
};

// Add all test data
export const seedAll = async () => {
  try {
    const categoryIds = await seedCategories();
    await seedProducts(categoryIds);
    console.log('All sample data added successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};