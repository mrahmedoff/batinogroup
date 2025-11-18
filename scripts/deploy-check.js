#!/usr/bin/env node

/**
 * Production Deployment Checker
 * Bu script production deployment için gerekli kontrolleri yapar
 */

const fs = require('fs');
const path = require('path');

console.log('🚀 Production Deployment Check\n');

// 1. Environment dosyalarını kontrol et
const envFiles = ['.env.local', '.env.production', '.env'];
const existingEnvFiles = envFiles.filter(file => fs.existsSync(file));

console.log('📁 Environment Files:');
existingEnvFiles.forEach(file => {
  console.log(`✅ ${file} exists`);
});

if (existingEnvFiles.length === 0) {
  console.log('❌ No environment files found!');
}

// 2. Firebase config dosyalarını kontrol et
const firebaseFiles = ['firebase.json', 'firestore.rules', 'storage.rules'];
console.log('\n🔥 Firebase Files:');
firebaseFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// 3. Build dosyalarını kontrol et
console.log('\n🏗️ Build Configuration:');
const buildFiles = ['next.config.ts', 'package.json', 'tsconfig.json'];
buildFiles.forEach(file => {
  const exists = fs.existsSync(file);
  console.log(`${exists ? '✅' : '❌'} ${file}`);
});

// 4. Deployment platform rehberi
console.log('\n📋 Deployment Platform Setup:');
console.log('');
console.log('🔹 VERCEL:');
console.log('   1. Vercel Dashboard → Project Settings → Environment Variables');
console.log('   2. Add all NEXT_PUBLIC_FIREBASE_* variables');
console.log('   3. Deploy: vercel --prod');
console.log('');
console.log('🔹 NETLIFY:');
console.log('   1. Site Settings → Environment Variables');
console.log('   2. Add all NEXT_PUBLIC_FIREBASE_* variables');
console.log('   3. Deploy: netlify deploy --prod');
console.log('');
console.log('🔹 FIREBASE HOSTING:');
console.log('   1. firebase deploy');
console.log('   2. Environment variables are read from .env.local automatically');
console.log('');

// 5. Environment değişkenleri template'i oluştur
const envTemplate = `# Copy these to your deployment platform
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyB3jOCvmodoCFE0yA9nutRp0MoXycx0CeI
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=batinogroup-website.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=batinogroup-website
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=batinogroup-website.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=635364422489
NEXT_PUBLIC_FIREBASE_APP_ID=1:635364422489:web:697b1f2b02de27bc3a5248
`;

fs.writeFileSync('.env.production.template', envTemplate);
console.log('✅ Created .env.production.template for deployment platforms');

console.log('\n🎯 Next Steps:');
console.log('1. Copy environment variables to your deployment platform');
console.log('2. Run: npm run build (to test locally)');
console.log('3. Deploy to your platform');
console.log('4. Check browser console for "Firebase Configuration Debug" logs');