export function Credits() {
    const handleClick = () => {
        window.open('https://www.asylum.fr/visualisation-3d-btp/', '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="group fixed bottom-0 right-0 hidden lg:flex items-center justify-evenly w-[6vw] h-[35px] rounded-tl-[14px] bg-white text-[11px] font-bold p-[2px] text-black
        transition-all duration-300 hover:bg-red-600 hover:text-white cursor-pointer z-30"
        >
            {/* Texte visible uniquement sur écrans ≥ 992px */}
            <div>Powered by</div>
            {/* Logo responsive */}
            <div className="h-[15px] lg:h-[30px]">
                <img
                    src={`${import.meta.env.BASE_URL}logo_asy.png`}
                    alt="Asylum Logo"
                    className="w-[15px] h-[15px] lg:w-[30px] lg:h-[30px] transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
            </div>
        </div>
    );
};