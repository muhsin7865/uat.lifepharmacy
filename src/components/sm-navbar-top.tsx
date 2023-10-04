import { useState } from "react"
import { TransitionComp } from "./ui/transition"
import { useLanguage } from "@/hooks/useLanguage"
import { Icon } from "./ui/icons"
import { Typography } from "./ui/typography"
const SmNavbarTop = () => {
    const [highestRatedP, sethighestRatedP] = useState(true)
    const { t } = useLanguage()
    return (
        highestRatedP ?
            <TransitionComp
                setTransition={highestRatedP} >
                <div className="flex bg-life-2 text-white text-xs px-2 py-1 justify-between items-center">
                    <div className="flex justify-start items-center rtl:space-x-reverse space-x-2">
                        <Icon type="crossIcon" onClick={()=>sethighestRatedP(false)} sizes={"sm"} />
                        <Typography lineClamp={"one"} size={"xs"} >{t.navbar.highest_rated_phar}</Typography>
                    </div>
                    <Typography size={"xs"} className="whitespace-nowrap">{t.navbar.download_now}</Typography>
                </div>
            </TransitionComp>
            : null
    )
}

export default SmNavbarTop