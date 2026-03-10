import { Smartphone } from 'lucide-react';

export function PortraitBlocker() {
    return (
        <div className="portrait-blocker">
            <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
                {/* Icône rotation */}

                <Smartphone stroke="white" className="w-20 h-20 text-white opacity-90 phone-rotate-anim" />

                <div>
                    <p className="text-white text-xl font-semibold mb-2">
                        Veuillez tourner votre appareil
                    </p>
                    <p className="text-white/70 text-sm">
                        Cette application est optimisée pour le mode paysage
                    </p>
                </div>
            </div>
        </div>
    )
}
