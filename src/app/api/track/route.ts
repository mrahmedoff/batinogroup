import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const analyticsPath = path.join(process.cwd(), 'src/data/analytics.json');

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { type, data } = await request.json();
    
    // Analytics faylını oxu
    let analytics = getAnalytics();
    const today = new Date().toISOString().split('T')[0];
    
    // Bugünkü statistikanı tap və ya yarat
    let todayStats = analytics.dailyStats.find((stat: any) => stat.date === today);
    if (!todayStats) {
      todayStats = {
        date: today,
        visitors: 0,
        pageViews: 0,
        messages: 0,
      };
      analytics.dailyStats.push(todayStats);
    }
    
    // Event tipinə görə statistikanı yenilə
    switch (type) {
      case 'pageview':
        todayStats.pageViews += 1;
        updateTopPages(analytics, data.path);
        break;
        
      case 'visitor':
        todayStats.visitors += 1;
        if (data.country) {
          updateCountries(analytics, data.country, data.flag || '🌍');
        }
        if (data.device) {
          updateDevices(analytics, data.device);
        }
        if (data.browser) {
          updateBrowsers(analytics, data.browser);
        }
        break;
        
      case 'message':
        todayStats.messages += 1;
        break;
    }
    
    // Overview statistikalarını yenilə
    analytics.overview.totalPageViews = analytics.dailyStats.reduce((sum: number, day: any) => sum + day.pageViews, 0);
    analytics.overview.totalVisitors = analytics.dailyStats.reduce((sum: number, day: any) => sum + day.visitors, 0);
    analytics.overview.totalMessages = analytics.dailyStats.reduce((sum: number, day: any) => sum + day.messages, 0);
    
    // Faylı yenilə
    fs.writeFileSync(analyticsPath, JSON.stringify(analytics, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Track error:', error);
    return NextResponse.json({ error: 'Failed to track event' }, { status: 500 });
  }
}

function getAnalytics() {
  if (!fs.existsSync(analyticsPath)) {
    const defaultData = generateDefaultAnalytics();
    fs.writeFileSync(analyticsPath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  return JSON.parse(fs.readFileSync(analyticsPath, 'utf8'));
}

function updateTopPages(analytics: any, pagePath: string) {
  const page = analytics.topPages.find((p: any) => p.path === pagePath);
  if (page) {
    page.views += 1;
  } else {
    analytics.topPages.push({ path: pagePath, views: 1, percentage: 0 });
  }
  
  // Faizləri yenilə
  const totalViews = analytics.topPages.reduce((sum: number, p: any) => sum + p.views, 0);
  analytics.topPages.forEach((p: any) => {
    p.percentage = parseFloat(((p.views / totalViews) * 100).toFixed(1));
  });
  
  // Ən çox baxılanlara görə sırala
  analytics.topPages.sort((a: any, b: any) => b.views - a.views);
  analytics.topPages = analytics.topPages.slice(0, 10);
}

function updateCountries(analytics: any, countryName: string, countryFlag: string) {
  // Ölkəni tap
  let country = analytics.countries.find((c: any) => c.name === countryName);
  
  if (country) {
    // Mövcud ölkə varsa, sayını artır
    country.value += 1;
  } else {
    // Yeni ölkə əlavə et
    analytics.countries.push({
      name: countryName,
      value: 1,
      flag: countryFlag
    });
  }
  
  // Ən çox ziyarətçisi olana görə sırala
  analytics.countries.sort((a: any, b: any) => b.value - a.value);
  
  // Yalnız top 10 ölkəni saxla
  analytics.countries = analytics.countries.slice(0, 10);
}

function updateDevices(analytics: any, deviceType: string) {
  // Əvvəlcə raw count-ları saxla
  if (!analytics.deviceCounts) {
    analytics.deviceCounts = {
      Desktop: 0,
      Mobile: 0,
      Tablet: 0
    };
  }
  
  if (analytics.deviceCounts[deviceType] !== undefined) {
    analytics.deviceCounts[deviceType] += 1;
  }
  
  // Faizləri hesabla
  const total = Object.values(analytics.deviceCounts).reduce((sum: number, val: any) => sum + val, 0);
  if (total > 0) {
    analytics.devices.forEach((d: any) => {
      const count = analytics.deviceCounts[d.name] || 0;
      d.value = Math.round((count / total) * 100);
    });
  }
}

function updateBrowsers(analytics: any, browserName: string) {
  // Əvvəlcə raw count-ları saxla
  if (!analytics.browserCounts) {
    analytics.browserCounts = {
      Chrome: 0,
      Safari: 0,
      Firefox: 0,
      Edge: 0
    };
  }
  
  if (analytics.browserCounts[browserName] !== undefined) {
    analytics.browserCounts[browserName] += 1;
  }
  
  // Faizləri hesabla
  const total = Object.values(analytics.browserCounts).reduce((sum: number, val: any) => sum + val, 0);
  if (total > 0) {
    analytics.browsers.forEach((b: any) => {
      const count = analytics.browserCounts[b.name] || 0;
      b.value = Math.round((count / total) * 100);
    });
  }
}

function generateDefaultAnalytics() {
  const today = new Date();
  const last90Days = Array.from({ length: 90 }, (_, i) => {
    const date = new Date(today);
    date.setDate(date.getDate() - (89 - i));
    return {
      date: date.toISOString().split('T')[0],
      visitors: Math.floor(Math.random() * 200) + 50,
      pageViews: Math.floor(Math.random() * 500) + 100,
      messages: Math.floor(Math.random() * 10) + 1,
    };
  });

  return {
    overview: {
      totalVisitors: 12543,
      totalPageViews: 45678,
      totalMessages: 234,
      avgSessionDuration: '3:45',
      bounceRate: 42.5,
      conversionRate: 3.2,
    },
    trends: {
      visitors: { value: 12543, change: 12.5, trend: 'up' },
      pageViews: { value: 45678, change: 8.3, trend: 'up' },
      messages: { value: 234, change: 15.7, trend: 'up' },
      bounceRate: { value: 42.5, change: -5.2, trend: 'down' },
    },
    dailyStats: last90Days,
    topPages: [
      { path: '/az', views: 15234, percentage: 33.4 },
      { path: '/az/services', views: 8765, percentage: 19.2 },
      { path: '/az/about', views: 6543, percentage: 14.3 },
      { path: '/az/contact', views: 5432, percentage: 11.9 },
    ],
    devices: [
      { name: 'Desktop', value: 45, color: '#667eea' },
      { name: 'Mobile', value: 40, color: '#764ba2' },
      { name: 'Tablet', value: 15, color: '#f093fb' },
    ],
    browsers: [
      { name: 'Chrome', value: 52 },
      { name: 'Safari', value: 25 },
      { name: 'Firefox', value: 15 },
      { name: 'Edge', value: 8 },
    ],
    countries: [],
  };
}
