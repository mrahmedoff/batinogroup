#!/usr/bin/env node

/**
 * Environment Variables Checker
 * Bu script deployment öncesi environment değişkenlerini kontrol eder
 */

// Load environment variables from .env files
require('dotenv').config({ path: '.env.local' });
require('dotenv').config({ path: '.env' });

const requiredEnvVars = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN', 
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID'
];

const optionalEnvVars = [
  'GMAIL_USER',
  'GMAIL_APP_PASSWORD',
  'EMAIL_TEST_MODE'
];

console.log('🔍 Environment Variables Check\n');

let hasErrors = false;

// Required variables check
console.log('📋 Required Firebase Variables:');
requiredEnvVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '❌';
  const displayValue = value ? (value.length > 20 ? value.substring(0, 20) + '...' : value) : 'MISSING';
  
  console.log(`${status} ${varName}: ${displayValue}`);
  
  if (!value) {
    hasErrors = true;
  }
});

console.log('\n📋 Optional Variables:');
optionalEnvVars.forEach(varName => {
  const value = process.env[varName];
  const status = value ? '✅' : '⚠️';
  const displayValue = value ? (value.length > 20 ? value.substring(0, 20) + '...' : value) : 'NOT SET';
  
  console.log(`${status} ${varName}: ${displayValue}`);
});

console.log('\n📊 Summary:');
console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
console.log(`Platform: ${process.platform}`);

if (hasErrors) {
  console.log('\n❌ HATA: Gerekli environment değişkenleri eksik!');
  console.log('\n🔧 Çözüm:');
  console.log('1. .env.local dosyasını kontrol edin');
  console.log('2. Deployment platformunda environment değişkenlerini ayarlayın');
  console.log('3. Firebase Console\'dan doğru değerleri kopyalayın');
  process.exit(1);
} else {
  console.log('\n✅ Tüm gerekli environment değişkenleri mevcut!');
  process.exit(0);
}