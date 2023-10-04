import getBrandsData from "@/lib/getBrandsData"
import BreadCrumb from "@/components/breadcrumb"
import Image from "next/image"
import Link from "next/link"
import { scroller } from 'react-scroll';
const alphabets = ['#', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'm', 'o']
export default function BrandsPage({ brandsData, alphaBrands }: { brandsData: any, alphaBrands: any }) {

    const scrollToSection = (alpha: string) => {
        scroller.scrollTo(alpha, {
            duration: 800,
            delay: 0,
            smooth: 'easeInOutQuart',
        });
    };

    return (
        <div className="mx-auto max-w-[1450px] px-[10px] ">
            <div className=" h-[12em] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                <div className='my-auto space-y-2'>
                    <h1 className='text-4xl text-center capitalize'>Brands</h1>
                    <h1 className='text-2xl  text-center   capitalize text-blue-500'>All Available Brands</h1>
                </div>
            </div>
            <BreadCrumb menuData={["Brands", ""]} type={"brands"} />

            <div className=" grid xl:grid-cols-5 sm:grid-cols-4 grid-cols-3  gap-3  mx-auto" id="brands-section">
                {brandsData.map((bd: any) => (
                    <div className="grid-flow-row mb-5"> <Link href={`/brand/${bd.slug}`} className={`flex flex-col mr-5 group/brandMenu`}>
                        <Image className="mx-auto rounded-full border border-white bg-white shadow-md" width={120} height={120} src={bd.images.logo} alt="" />
                        <h5 className="text-center mt-3 xl:text-base md:text-sm text-xs group-hover/brandMenu:text-blue-500 transition-colors duration-300 text-black">{bd.name}</h5>
                    </Link></div>
                ))}
            </div>
            <div className="mx-auto py-5 shadow-md overflow-x-auto no-scrollbar">
                <div className="w-fit flex mx-auto">
                    {alphabets.map((alpha: string) =>
                        <button onClick={() => scrollToSection(alpha)} className="text-[#39f] font-extrabold scale-100 hover:scale-150 duration-200 transition-all ease-in mr-4 text-3xl ">{alpha}</button>
                    )}
                </div>
            </div>
            {alphabets.map(alpha => (
                <div className="space-y-3" id={`${alpha}`}>
                    <h1 className="underline-offset-2 underline font-bold text-3xl py-2 sticky md:top-40 top-12 z-30">{alpha}</h1>
                    <div className="grid xl:grid-cols-6 md:grid-cols-4 grid-cols-3 gap-2 gap-y-3">
                        {alphaBrands[alpha].map((brand: any) => (
                            <Link href={`/brand/${brand.slug}`}>
                                <Image src={brand.images.logo ? brand.images.logo : "/images/default-product-image.png"} height={180} width={180} alt={brand.name} className=" rounded-full translate-y-0 duration-500 mx-auto hover:-translate-y-4" />
                                <p className="text-center text-xs">{brand.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )

}


export async function getStaticProps() {

    const brandsData = await getBrandsData(false)
    const alphaBrands = await getBrandsData(true)

    return {
        props: {
            brandsData: brandsData.data.brands,
            alphaBrands: alphaBrands.data.brands
        }
    }
}