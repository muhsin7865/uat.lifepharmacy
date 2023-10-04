import Image from "next/image"
import Link from "next/link"
import { useSession } from "next-auth/react"
import { useLanguage } from "@/hooks/useLanguage"
const NavbarBottom = ({ locationOnClickHandle, AddressDataIndex }: { locationOnClickHandle: any, AddressDataIndex: any }) => {
  const { data: session } = useSession()
  const { t } = useLanguage()

  function displayedAddress(displayAddressData: any) {
    if (displayAddressData) {
      if ((displayAddressData?.google_address).length > 30) {
        return displayAddressData?.google_address.substring(0, 30) + '...'
      }
      else {
        return displayAddressData?.google_address
      }
    }
    else {
      return ""
    }

  }


  return (
    <>
  <div className="bg-[#a92579] items-center">
        <div className="  justify-between py-1 max-w-[1450px] mx-auto  sm:px-[10px] px-[5px] text-white lg:flex md:flex hidden " >
          <Link href={"/super-summer-savers"} className={"flex justify-start space-x-3 rtl:space-x-reverse"}>
            <div className={` my-auto`}>
              <small className="text-xs whitespace-nowrap">{t.navbar.highest_rated_phar} <span className=" ml-2">|</span> </small>
            </div>
            <Image src={"https://www.lifepharmacy.com/images/app-rating.svg"} className="lg:w-20 w-10 h-5 my-auto" height={30} width={30} alt={"app-rating"} />
            <div className="flex items-center">
              <span className="font-semibold mr-1">|</span>
              <small className="text-xs whitespace-nowrap">Download Now</small>
            </div>
          </Link>
          <div className="text-end flex justify-between items-center ">
            <small className="mx-4 text-xs whitespace-nowrap">{t.navbar.deliver_to}  {session?.token?.addresses && session?.token?.addresses.length != 0 ? (displayedAddress(AddressDataIndex)) : "Dubai, United Arab Emirates"}</small>
            <button
              className="bg-white text-life-2 text-xs rounded px-2   font-bold py-1 flex items-center text-life" onClick={() => { locationOnClickHandle() }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="w-4 h-3 mr-1" viewBox="0 0 16 16">
                <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <span>CHANGE</span>  </button>
          </div>
        </div>
      </div>
      <div className="sm:visible md:hidden ">
        <div className="flex  bg-life text-white text-xs px-[10px] py-1 justify-between items-center">
          <div>{t.navbar.deliver_to}:   <span className="mx-2">Business Bay, Dubai</span>  </div>
          <button className="bg-white rounded text-pink-700 w-20 py-1" onClick={() => { locationOnClickHandle() }}>CHANGE</button>
        </div>
      </div>
    </>
  )
}

export default NavbarBottom