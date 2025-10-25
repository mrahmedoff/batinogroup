'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    // Səhifə baxışını qeyd et
    trackPageView();
    
    // İlk dəfə ziyarət edərsə, ziyarətçi kimi qeyd et
    if (!sessionStorage.getItem('visitor_tracked')) {
      trackVisitor();
      sessionStorage.setItem('visitor_tracked', 'true');
    }
  }, [pathname]);

  const trackPageView = async () => {
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'pageview',
          data: { path: pathname }
        })
      });
      
      if (response.ok) {
        console.log('✅ Pageview tracked:', pathname);
      }
    } catch (error) {
      console.error('❌ Failed to track pageview:', error);
    }
  };

  const trackVisitor = async () => {
    try {
      // Cihaz tipini müəyyən et
      const device = getDeviceType();
      
      // Brauzer tipini müəyyən et
      const browser = getBrowserType();
      
      // IP əsasında ölkəni müəyyən et
      let country = 'Naməlum';
      let flag = '🌍';
      
      try {
        const geoResponse = await fetch('/api/geolocation');
        const geoData = await geoResponse.json();
        
        if (geoData.success) {
          country = geoData.country;
          flag = geoData.flag;
          console.log('🌍 Location detected:', country, flag, 'IP:', geoData.ip);
        }
      } catch (geoError) {
        console.warn('⚠️ Geolocation failed, using default');
      }

      const response = await fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'visitor',
          data: { device, browser, country, flag }
        })
      });
      
      if (response.ok) {
        console.log('✅ Visitor tracked:', { device, browser, country, flag });
      }
    } catch (error) {
      console.error('❌ Failed to track visitor:', error);
    }
  };

  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'Tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'Mobile';
    }
    return 'Desktop';
  };

  const getBrowserType = () => {
    const ua = navigator.userAgent;
    if (ua.includes('Chrome') && !ua.includes('Edg')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Edg')) return 'Edge';
    return 'Chrome';
  };

  return null;
}

// Mesaj göndəriləndə çağırılacaq funksiya
export async function trackMessage() {
  try {
    const response = await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        type: 'message',
        data: {}
      })
    });
    
    if (response.ok) {
      console.log('✅ Message tracked');
    }
  } catch (error) {
    console.error('❌ Failed to track message:', error);
  }
}
