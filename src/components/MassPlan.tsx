import { useState } from "react";
import { Play } from "@/components/animate-ui/icons/play"
import { useNavigationMode } from "@/contexts/NavigationModeContext"

export function MassPlan() {
    const [display, setDisplay] = useState(true);
    const { mode } = useNavigationMode()

    // Ne pas afficher le plan de masse en mode Installation
    if (mode === "installation") {
        return null
    } return (
        <>
            <div className={`relative w-fit ${display ? 'border border-white' : 'border-none'} shadow-2xl select-none`}>
                {display && (
                    <>
                        <img
                            src="/MassPlan.jpg"
                            alt="Mass Plan"
                            className="w-full h-auto max-w-sm shadow-lg object-cover pointer-events-none"
                        />
                        <div className="absolute bottom-18 left-3 pointer-events-none rotate-340 ">
                            <svg width="45" height="45" viewBox="0 0 24 24" version="1.1" style={{ fillRule: "evenodd", clipRule: "evenodd", strokeLinejoin: "round", strokeMiterlimit: 2 }}>
                                <defs>
                                    <radialGradient id="eye-gradient" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="matrix(7.25512,0,0,11.0104,7.90496,11.9798)">
                                        <stop offset="0" style={{ stopColor: "red", stopOpacity: 1 }} />
                                        <stop offset="0.5" style={{ stopColor: "red", stopOpacity: 1 }} />
                                        <stop offset="1" style={{ stopColor: "red", stopOpacity: 0 }} />
                                    </radialGradient>
                                </defs>
                                <g transform="matrix(1.29721,0,0,1.29721,-6.72275,-3.56655)">
                                    <g transform="matrix(1.54147,0,0,1.54147,-3.79129,-6.46645)">
                                        <path d="M7.905,12.002C7.905,12.002 12.939,6.394 13.017,6.48L13.022,6.475L13.022,6.486C14.394,7.984 15.16,9.945 15.16,11.985C15.16,14.026 14.394,15.987 13.022,17.485L7.905,12.002Z" style={{ fill: "url(#eye-gradient)" }} />
                                    </g>
                                    <path d="M9.226,12.626L16.431,19.831C16.542,19.942 16.605,20.093 16.605,20.25C16.605,20.407 16.542,20.558 16.431,20.669L16.419,20.681C16.308,20.792 16.157,20.855 16,20.855C15.843,20.855 15.692,20.792 15.581,20.681L7.319,12.419C7.208,12.308 7.145,12.157 7.145,12C7.145,11.843 7.208,11.692 7.319,11.581L15.581,3.319C15.692,3.208 15.843,3.145 16,3.145C16.157,3.145 16.308,3.208 16.419,3.319L16.431,3.331C16.542,3.442 16.605,3.593 16.605,3.75C16.605,3.907 16.542,4.058 16.431,4.169L9.176,11.424L20.144,11.424L18.574,9.854C18.462,9.743 18.4,9.592 18.4,9.435C18.4,9.278 18.462,9.127 18.574,9.016L18.586,9.004C18.697,8.893 18.847,8.83 19.005,8.83C19.162,8.83 19.312,8.893 19.424,9.004L22.047,11.627C22.278,11.859 22.278,12.234 22.047,12.465L19.439,15.073C19.328,15.184 19.177,15.247 19.02,15.247C18.863,15.247 18.712,15.184 18.601,15.073L18.589,15.061C18.358,14.83 18.358,14.454 18.589,14.223L20.186,12.626L9.226,12.626Z" style={{ fill: "red", stroke: "black", strokeWidth: "0.24px" }} />
                                </g>
                            </svg>
                        </div>
                    </>
                )}                <div
                    className="absolute top-2 right-2 z-10 cursor-pointer shadow-2xl select-none bg-white"
                    title={display ? "Replier le plan de masse" : "Déplier le plan de masse"}
                >
                    {display ?
                        <Play
                            onClick={() => setDisplay(false)}
                            size={22}
                            fill="black"
                            className="rotate-90"
                        />
                        :
                        <Play
                            onClick={() => setDisplay(true)}
                            size={22}
                            fill="black"
                            className="rotate-270"
                        />
                    }
                </div>
            </div>
        </>
    )
}