export function PortraitBlocker() {
    return (
        <div className="portrait-blocker">
            <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
                {/* Icône rotation */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-20 h-20 text-white opacity-90 animate-bounce"
                >
                    <path d="M4 8a7 7 0 0 1 7-7h0a7 7 0 0 1 7 7v8a7 7 0 0 1-7 7h0a7 7 0 0 1-7-7V8Z" />
                    <path d="M12 18h.01" />
                    <path d="M19 3l2 2-2 2" />
                    <path d="M21 5H9" />
                </svg>
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
