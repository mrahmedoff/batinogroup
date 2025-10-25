import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

// Pulsuz IP geolocation API
const IPAPI_URL = 'http://ip-api.com/json/';

export async function GET() {
  try {
    // Client IP-ni əldə et
    const headersList = headers();
    const forwarded = headersList.get('x-forwarded-for');
    const realIp = headersList.get('x-real-ip');
    
    // IP-ni müəyyən et (localhost üçün test IP)
    let clientIp = forwarded?.split(',')[0] || realIp || '8.8.8.8';
    
    // Localhost-sa test IP istifadə et
    if (clientIp === '::1' || clientIp === '127.0.0.1' || clientIp.startsWith('192.168.')) {
      // Test üçün müxtəlif IP-lər (development)
      // Polşa IP-si üçün test
      clientIp = '83.0.0.1'; // Polşa IP range
    }
    
    console.log('🌍 Detecting location for IP:', clientIp);
    
    // IP geolocation API-dən məlumat əldə et
    const response = await fetch(`${IPAPI_URL}${clientIp}?fields=status,country,countryCode,city,lat,lon,timezone`);
    const data = await response.json();
    
    if (data.status === 'success') {
      // Ölkə adını Azərbaycan dilinə tərcümə et
      const countryMap: { [key: string]: { name: string; flag: string } } = {
        'Azerbaijan': { name: 'Azərbaycan', flag: '🇦🇿' },
        'Turkey': { name: 'Türkiyə', flag: '🇹🇷' },
        'Russia': { name: 'Rusiya', flag: '🇷🇺' },
        'United States': { name: 'ABŞ', flag: '🇺🇸' },
        'Germany': { name: 'Almaniya', flag: '🇩🇪' },
        'United Kingdom': { name: 'Böyük Britaniya', flag: '🇬🇧' },
        'France': { name: 'Fransa', flag: '🇫🇷' },
        'Poland': { name: 'Polşa', flag: '🇵🇱' },
        'Ukraine': { name: 'Ukrayna', flag: '🇺🇦' },
        'Georgia': { name: 'Gürcüstan', flag: '🇬🇪' },
        'Iran': { name: 'İran', flag: '🇮🇷' },
        'Kazakhstan': { name: 'Qazaxıstan', flag: '🇰🇿' },
        'Uzbekistan': { name: 'Özbəkistan', flag: '🇺🇿' },
        'Turkmenistan': { name: 'Türkmənistan', flag: '🇹🇲' },
        'China': { name: 'Çin', flag: '🇨🇳' },
        'India': { name: 'Hindistan', flag: '🇮🇳' },
        'Japan': { name: 'Yaponiya', flag: '🇯🇵' },
        'South Korea': { name: 'Cənubi Koreya', flag: '🇰🇷' },
        'Canada': { name: 'Kanada', flag: '🇨🇦' },
        'Brazil': { name: 'Braziliya', flag: '🇧🇷' },
        'Australia': { name: 'Avstraliya', flag: '🇦🇺' },
        'Italy': { name: 'İtaliya', flag: '🇮🇹' },
        'Spain': { name: 'İspaniya', flag: '🇪🇸' },
        'Netherlands': { name: 'Niderland', flag: '🇳🇱' },
        'Belgium': { name: 'Belçika', flag: '🇧🇪' },
        'Sweden': { name: 'İsveç', flag: '🇸🇪' },
        'Norway': { name: 'Norveç', flag: '🇳🇴' },
        'Denmark': { name: 'Danimarka', flag: '🇩🇰' },
        'Finland': { name: 'Finlandiya', flag: '🇫🇮' },
        'Austria': { name: 'Avstriya', flag: '🇦🇹' },
        'Switzerland': { name: 'İsveçrə', flag: '🇨🇭' },
        'Greece': { name: 'Yunanıstan', flag: '🇬🇷' },
        'Romania': { name: 'Rumıniya', flag: '🇷🇴' },
        'Bulgaria': { name: 'Bolqarıstan', flag: '🇧🇬' },
        'Czech Republic': { name: 'Çexiya', flag: '🇨🇿' },
        'Hungary': { name: 'Macarıstan', flag: '🇭🇺' },
        'Portugal': { name: 'Portuqaliya', flag: '🇵🇹' },
        'Israel': { name: 'İsrail', flag: '🇮🇱' },
        'Saudi Arabia': { name: 'Səudiyyə Ərəbistanı', flag: '🇸🇦' },
        'United Arab Emirates': { name: 'BƏƏ', flag: '🇦🇪' },
        'Egypt': { name: 'Misir', flag: '🇪🇬' },
        'South Africa': { name: 'Cənubi Afrika', flag: '🇿🇦' },
        'Mexico': { name: 'Meksika', flag: '🇲🇽' },
        'Argentina': { name: 'Argentina', flag: '🇦🇷' },
      };
      
      const countryInfo = countryMap[data.country] || { 
        name: data.country, 
        flag: '🌍' 
      };
      
      console.log('✅ Location detected:', countryInfo.name, countryInfo.flag);
      
      return NextResponse.json({
        success: true,
        country: countryInfo.name,
        flag: countryInfo.flag,
        countryCode: data.countryCode,
        city: data.city,
        ip: clientIp,
        timezone: data.timezone,
      });
    }
    
    // Əgər API işləməzsə, default
    return NextResponse.json({
      success: false,
      country: 'Naməlum',
      flag: '🌍',
      ip: clientIp,
    });
    
  } catch (error) {
    console.error('❌ Geolocation error:', error);
    return NextResponse.json({
      success: false,
      country: 'Naməlum',
      flag: '🌍',
    });
  }
}
