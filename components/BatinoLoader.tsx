'use client';

import Image from 'next/image';
import { useData } from '@/contexts/DataContext';

export default function BatinoLoader() {
    const { settings } = useData();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="relative w-80 h-80 max-w-[90vw] max-h-[90vh]">
                <Image
                    src={settings.logo || "/batinologo.png"}
                    alt={settings.siteName || "Batino Group Logo"}
                    fill
                    className="object-contain animate-[fadeInOut_2s_ease-in-out_infinite]"
                    priority
                    unoptimized
                />
            </div>

            <style jsx>{`
                @keyframes fadeInOut {
                    0% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0.9);
                    }
                }
            `}</style>
        </div>
    );
}