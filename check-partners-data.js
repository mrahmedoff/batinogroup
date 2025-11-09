// Partners məlumatlarını yoxla və əlavə et
const { initializeApp } = require('firebase/app');
const { getFirestore, collection, getDocs, addDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyB3jOCvmodoCFE0yA9nutRp0MoXycx0CeI",
  authDomain: "batinogroup-website.firebaseapp.com",
  projectId: "batinogroup-website",
  storageBucket: "batinogroup-website.firebasestorage.app",
  messagingSenderId: "635364422489",
  appId: "1:635364422489:web:697b1f2b02de27bc3a5248"
};

async function checkPartnersData() {
  try {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    
    console.log('=== PARTNERS MƏLUMATLARI ===');
    const partnersRef = collection(db, 'partners');
    const partnersSnapshot = await getDocs(partnersRef);
    
    console.log(`📁 Partners collection: ${partnersSnapshot.size} məlumat`);
    
    if (partnersSnapshot.size === 0) {
      console.log('🔄 Nümunə partners məlumatları əlavə edilir...');
      
      const samplePartners = [
        {
          name: 'SKF',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/SKF-Logo.svg/320px-SKF-Logo.svg.png',
          website: 'https://www.skf.com',
          type: 'Tərəfdaş',
          description: 'Leading bearing and seal manufacturer'
        },
        {
          name: 'Siemens',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Siemens-logo.svg/320px-Siemens-logo.svg.png',
          website: 'https://www.siemens.com',
          type: 'Tərəfdaş',
          description: 'Industrial automation and digitalization'
        },
        {
          name: 'ABB',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/ABB_logo.svg/320px-ABB_logo.svg.png',
          website: 'https://www.abb.com',
          type: 'Tərəfdaş',
          description: 'Power and automation technologies'
        },
        {
          name: 'Schneider Electric',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Schneider_Electric_logo.svg/320px-Schneider_Electric_logo.svg.png',
          website: 'https://www.se.com',
          type: 'Tərəfdaş',
          description: 'Energy management and automation'
        },
        {
          name: 'Fluke',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Fluke_Corporation_logo.svg/320px-Fluke_Corporation_logo.svg.png',
          website: 'https://www.fluke.com',
          type: 'Tərəfdaş',
          description: 'Electronic test tools and software'
        },
        {
          name: 'Grundfos',
          logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Grundfos_logo.svg/320px-Grundfos_logo.svg.png',
          website: 'https://www.grundfos.com',
          type: 'Tərəfdaş',
          description: 'Pump solutions and water technology'
        }
      ];
      
      for (const partner of samplePartners) {
        await addDoc(partnersRef, {
          ...partner,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        console.log(`✅ ${partner.name} əlavə edildi`);
      }
      
      console.log('🎉 Bütün partners məlumatları əlavə edildi!');
    } else {
      console.log('📋 Mövcud partners:');
      partnersSnapshot.forEach((doc) => {
        const data = doc.data();
        console.log(`- ${data.name} (${data.type}) - Logo: ${data.logo ? 'Var' : 'Yox'}`);
      });
    }
    
  } catch (error) {
    console.error('❌ Xəta:', error);
  }
}

checkPartnersData();