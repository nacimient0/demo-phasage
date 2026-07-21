import { useEffect, useRef } from "react"
import { ProgressBar } from "./ProgressBar"
import { TimelineControls, TimelineNextButton, TimelinePreviousButton } from "./TimelineControls"
import { PhaseIndicator, TimelinePoints } from "./TimelinePoints"
import { useNavigationMode } from "@/contexts/NavigationModeContext"
import { useInstallationNav } from "@/hooks/useNavigationNav"
import { installationViews } from "@/data/phases"
import { Swiper, SwiperSlide } from "swiper/react"
import { cn } from "@/lib/utils"

import "swiper/css"

function InstallationGallery() {
    const { installationIndex, goTo } = useInstallationNav()
    const swiperRef = useRef<any>(null)

    useEffect(() => {
        if (swiperRef.current && swiperRef.current.activeIndex !== installationIndex) {
            swiperRef.current.slideTo(installationIndex)
        }
    }, [installationIndex])

    // Seuil au-delà duquel le Swiper est nécessaire (= max slidesPerView des breakpoints)
    const MAX_VISIBLE = 9
    const needsSwiper = installationViews.length > MAX_VISIBLE

    const thumbnailButton = (view: (typeof installationViews)[0], index: number) => {
        const isActive = index === installationIndex
        return (
            <button
                key={view.id}
                onClick={() => {
                    goTo(index)
                    swiperRef.current?.slideTo(index)
                }}
                className={cn(
                    "relative flex size-10 lg:size-16 overflow-hidden cursor-pointer focus:outline-none transition-all duration-300 shrink-0",
                    isActive
                        ? "border-2 border-[#E30613] scale-110 z-10"
                        : "border border-white/40 opacity-70 hover:opacity-100 hover:scale-105"
                )}
                title={view.label}
            >
                <img
                    src={`${import.meta.env.BASE_URL}${view.image}`}
                    alt={view.label}
                    className="w-full h-full object-cover"
                    loading="lazy"
                />
                <div className="absolute inset-0 hover:bg-transparent transition-colors duration-200" />
            </button>
        )
    }

    // Peu de photos : barre en w-fit centrée, pas de Swiper
    if (!needsSwiper) {
        return (
            <div className="flex relative border rounded-full border-white w-fit px-3 lg:px-6 gap-3 lg:gap-6 bg-white/30 backdrop-blur-sm items-center h-16 lg:h-20 shadow-lg">
                <TimelinePreviousButton />
                <div className="flex gap-2 lg:gap-3 items-center justify-center select-none py-2">
                    {installationViews.map((view, index) => thumbnailButton(view, index))}
                </div>
                <TimelineNextButton />
            </div>
        )
    }

    // Beaucoup de photos : Swiper scrollable pleine largeur
    return (
        <div className="flex relative border rounded-full border-white w-full max-w-4xl px-3 lg:px-6 gap-3 lg:gap-6 bg-white/30 backdrop-blur-sm items-center h-16 lg:h-20 shadow-lg">
            <TimelinePreviousButton />
            <div className="flex-1 overflow-hidden select-none h-full flex items-center justify-center">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper
                    }}
                    onSlideChange={(swiper) => {
                        goTo(swiper.activeIndex)
                    }}
                    initialSlide={installationIndex}
                    spaceBetween={8}
                    slidesOffsetBefore={8}
                    slidesOffsetAfter={8}
                    breakpoints={{
                        480: {
                            slidesPerView: 6,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 7,
                            spaceBetween: 0,
                        },
                        1024: {
                            slidesPerView: 9,
                            spaceBetween: 0,
                        }
                    }}
                    className="w-full h-full"
                >
                    {installationViews.map((view, index) => (
                        <SwiperSlide key={view.id} className="flex items-center justify-center h-full py-2">
                            {thumbnailButton(view, index)}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <TimelineNextButton />
        </div>
    )
}

export function PhaseTimeline() {
    const { mode, timelineVisible } = useNavigationMode()

    if (!timelineVisible) return null

    // Mode Installation
    if (mode === "installation") {
        return (
            <div className="absolute flex bottom-2 lg:bottom-8 left-0 right-0 px-2 lg:px-0 z-10 justify-center">
                <InstallationGallery />
            </div>
        )
    }

    // Modes Planning et Phasage :
    // Desktop → layout original centré, w-fit, pas de scroll
    // Mobile  → scroll horizontal, labels au-dessus grâce au pt-8
    return (
        <>
            {/* ── DESKTOP ── */}
            <div className="hidden lg:absolute lg:flex lg:bottom-8 left-0 right-0 px-4 2xl:px-0">
                <div className="flex mx-auto w-full justify-center pt-10 2xl:w-auto">
                    <div className="flex relative border rounded-full border-white w-full 2xl:w-fit px-6 gap-10 bg-white/30 backdrop-blur-none">
                        <TimelineControls />
                        <TimelinePreviousButton />
                        <div className="relative flex py-6 flex-1 min-w-0 2xl:flex-none h-18">
                            <ProgressBar />
                            <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between 2xl:gap-30" : "justify-between 2xl:gap-6"}`}>
                                {mode === "planning" && <PhaseIndicator />}
                                <TimelinePoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>

            {/* ── MOBILE ── */}
            <div className="lg:hidden h-fit absolute flex bottom-2 left-0 right-0 px-2">
                <div className="w-full overflow-x-auto scrollbar-none pt-6 pb-1">
                    <div className="flex relative border py-2 rounded-full border-white w-fit mx-auto px-2 gap-2 bg-white/30 backdrop-blur-none items-center">
                        <TimelineControls />
                        <TimelinePreviousButton />
                        <div className="relative flex py-2 w-full">
                            <ProgressBar />
                            <div className={`relative flex items-center w-full ${mode === "phasage" ? "justify-between gap-3" : "justify-between gap-2"}`}>
                                {mode === "planning" && <PhaseIndicator />}
                                <TimelinePoints />
                            </div>
                        </div>
                        <TimelineNextButton />
                    </div>
                </div>
            </div>
        </>
    )
}