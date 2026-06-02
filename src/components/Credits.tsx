export function Credits() {
    const handleClick = () => {
        window.open('https://www.asylum.fr/visualisation-3d-btp/', '_blank');
    };

    return (
        <div
            onClick={handleClick}
            className="group fixed bottom-0 right-0 hidden lg:flex items-center gap-1.5 w-fit whitespace-nowrap h-[26px] 2xl:h-[35px] rounded-tl-[10px] 2xl:rounded-tl-[14px] bg-white text-[10px] 2xl:text-[11px] font-bold px-3 text-black transition-all duration-300 hover:bg-red-600 hover:text-white cursor-pointer z-30"
        >
            {/* Texte visible uniquement sur écrans ≥ 992px */}
            <div>Powered by</div>
            {/* Logo responsive */}
            <div className="h-[20px] 2xl:h-[30px]">
                <img
                    src={`${import.meta.env.BASE_URL}logo_asy.png`}
                    alt="Asylum Logo"
                    className="w-[20px] h-[20px] 2xl:w-[30px] 2xl:h-[30px] transition-all duration-300 group-hover:brightness-0 group-hover:invert" />
            </div>
        </div>
    );
};