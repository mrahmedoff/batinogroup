const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB3jOCvmodoCFE0yA9nutRp0MoXycx0CeI",
  authDomain: "batinogroup-website.firebaseapp.com",
  projectId: "batinogroup-website",
  storageBucket: "batinogroup-website.firebasestorage.app",
  messagingSenderId: "635364422489",
  appId: "1:635364422489:web:697b1f2b02de27bc3a5248"
};

async function addPartners() {
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  
  const partners = [
    {
      name: 'SKF',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/SKF-Logo.png',
      website: 'https://www.skf.com',
      type: 'Tərəfdaş',
      description: 'Leading bearing and seal manufacturer'
    },
    {
      name: 'Siemens',
      logo: 'https://logos-world.net/wp-content/uploads/2020/06/Siemens-Logo.png',
      website: 'https://www.siemens.com',
      type: 'Tərəfdaş',
      description: 'Industrial automation and digitalization'
    },
    {
      name: 'ABB',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/ABB-Logo.png',
      website: 'https://www.abb.com',
      type: 'Tərəfdaş',
      description: 'Power and automation technologies'
    },
    {
      name: 'Schneider Electric',
      logo: 'https://logos-world.net/wp-content/uploads/2020/11/Schneider-Electric-Logo.png',
      website: 'https://www.se.com',
      type: 'Tərəfdaş',
      description: 'Energy management and automation'
    },
    {
      name: 'Fluke Corporation',
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/Fluke-Logo.png',
      website: 'https://www.fluke.com',
      type: 'Tərəfdaş',
      description: 'Electronic test tools and software'
    },
    {
      name: 'Grundfos',
      logo: 'https://logos-world.net/wp-content/uploads/2021/02/Grundfos-Logo.png',
      website: 'https://www.grundfos.com',
      type: 'Tərəfdaş',
      description: 'Pump solutions and water technology'
    }
  ];
  
  console.log('Partners əlavə edilir...');
  
  for (const partner of partners) {
    try {
      await addDoc(collection(db, 'partners'), {
        ...partner,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      console.log(`✅ ${partner.name} əlavə edildi`);
    } catch (error) {
      console.error(`❌ ${partner.name} əlavə edilərkən xəta:`, error);
    }
  }
  
  console.log('🎉 Partners əlavə etmə tamamlandı!');
}

addPartners();