import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const analyticsPath = path.join(process.cwd(), 'src/data/analytics.json');

// Analytics məlumatlarını oxu
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || '30d';

    // Əgər fayl yoxdursa, default məlumatlar yarat
    if (!fs.existsSync(analyticsPath)) {
      const defaultData = generateDefaultAnalytics();
      fs.writeFileSync(analyticsPath, JSON.stringify(defaultData, null, 2));
    }

    const fileContents = fs.readFileSync(analyticsPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    // Vaxt aralığına görə məlumatları filtrələ
    const filteredData = filterByRange(data, range);
    return NextResponse.json(filteredData);
  } catch (error) {
    console.error('Analytics read error:', error);
    return NextResponse.json(generateDefaultAnalytics());
  }
}

function filterByRange(data: any, range: string) {
  const days = range === '1d' ? 1 : range === '7d' ? 7 : range === '30d' ? 30 : 90;
  const filteredStats = data.dailyStats.slice(-days);
  
  // Statistikaları hesabla
  const totalVisitors = filteredStats.reduce((sum: number, day: any) => sum + day.visitors, 0);
  const totalPageViews = filteredStats.reduce((sum: number, day: any) => sum + day.pageViews, 0);
  const totalMessages = filteredStats.reduce((sum: number, day: any) => sum + day.messages, 0);
  
  // Əvvəlki dövrlə müqayisə
  const previousStats = data.dailyStats.slice(-days * 2, -days);
  const prevVisitors = previousStats.reduce((sum: number, day: any) => sum + day.visitors, 0);
  const prevPageViews = previousStats.reduce((sum: number, day: any) => sum + day.pageViews, 0);
  const prevMessages = previousStats.reduce((sum: number, day: any) => sum + day.messages, 0);
  
  // Dəyişiklik faizini hesabla (0 bölməni qarşısını al)
  const visitorChange = prevVisitors > 0 
    ? parseFloat(((totalVisitors - prevVisitors) / prevVisitors * 100).toFixed(1))
    : totalVisitors > 0 ? 100 : 0;
  
  const pageViewChange = prevPageViews > 0 
    ? parseFloat(((totalPageViews - prevPageViews) / prevPageViews * 100).toFixed(1))
    : totalPageViews > 0 ? 100 : 0;
  
  const messageChange = prevMessages > 0 
    ? parseFloat(((totalMessages - prevMessages) / prevMessages * 100).toFixed(1))
    : totalMessages > 0 ? 100 : 0;
  
  // Bounce rate hesabla (səhifə baxışı varsa)
  const bounceRate = totalPageViews > 0 
    ? parseFloat((((totalPageViews - totalVisitors) / totalPageViews * 100)).toFixed(1))
    : 0;
  
  return {
    ...data,
    dailyStats: filteredStats,
    overview: {
      ...data.overview,
      totalVisitors,
      totalPageViews,
      totalMessages,
      bounceRate,
    },
    trends: {
      visitors: { 
        value: totalVisitors, 
        change: visitorChange, 
        trend: visitorChange >= 0 ? 'up' : 'down' 
      },
      pageViews: { 
        value: totalPageViews, 
        change: pageViewChange, 
        trend: pageViewChange >= 0 ? 'up' : 'down' 
      },
      messages: { 
        value: totalMessages, 
        change: messageChange, 
        trend: messageChange >= 0 ? 'up' : 'down' 
      },
      bounceRate: { 
        value: bounceRate, 
        change: 0, 
        trend: 'down' 
      },
    },
  };
}

// Analytics məlumatlarını yenilə
export async function POST(request: Request) {
  try {
    const newData = await request.json();
    fs.writeFileSync(analyticsPath, JSON.stringify(newData, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save analytics' }, { status: 500 });
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
      { path: '/admin/dashboard', views: 2345, percentage: 5.1 },
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
    countries: [
      { name: 'Azərbaycan', value: 8500, flag: '🇦🇿' },
      { name: 'Türkiyə', value: 2100, flag: '🇹🇷' },
      { name: 'Rusiya', value: 1200, flag: '🇷🇺' },
      { name: 'ABŞ', value: 543, flag: '🇺🇸' },
      { name: 'Digər', value: 200, flag: '🌍' },
    ],
  };
}
