import AccordionCategoryMenu from "@/components/accordion-cat";
import BreadCrumb from "@/components/breadcrumb";
import getCategoryData from "@/lib/getCategoryData";
import Image from "next/image";
import Link from "next/link";

export default function CategoryMenu({ categoryMenuParams, catData, menuData = ["Category", String(categoryMenuParams).replace(/-/g, ' ')] }: { catData: any, menuData: string[], categoryMenuParams: string }) {

    const filtCatData = catData.data.filter((cat_data: any) => (slugify(cat_data.name) === categoryMenuParams))

    function slugify(text: string) {
        return text.toLowerCase().replace(/[\s&]+/g, '-');
    }

    return (
        <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">


            <div className=" lg:grid hidden h-[12em] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                <div className='my-auto space-y-2'>
                    {menuData[0] ? <h1 className='text-4xl text-center capitalize'>{menuData[0]}</h1> : null}
                    <h1 className='text-2xl text-center capitalize text-blue-500'>{menuData[1] ? String(menuData[1]).toLowerCase().replace(/-/g, ' ') : " Products"} </h1>
                </div>
            </div>
            <div className="md:block hidden">
                <BreadCrumb menuData={menuData} type="category-menu"/>
            </div>

            <div className="grid grid-cols-12  gap-y-5 gap-x-6">
                <div className="sm:space-y-2 space-y-1 md:px-2 px-0 py-5 col-span-4">
                    <h1 className="font-semibold md:block hidden">Category</h1>
                    {catData.data.map((cat_data: any) => (
                        <div className="flex justify-between text-gray-800 text-sm md:font-normal font-semibold ">
                            <div className="md:text-left text-center w-full md:py-0 sm:py-2 py-[10px]  md:shadow-none shadow-sm shadow-slate-200 sm:leading-6 leading-[11px]">
                                <Link href={`/category-menu/${slugify(cat_data.name)}`} className={`sm:text-xs max-[350px]:text-[7px] text-[10px] md:text-base block leading-tight ${menuData[1] === cat_data.name.toLowerCase() ? "text-blue-500" : ""} hover:text-blue-500`}>{cat_data.name}</Link>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="col-span-8">
                    <div className="relative w-full">
                        <Image src={filtCatData[0].images.banner} height={500} width={1440} alt="headerimg" className='object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto' />
                        <button className="bg-slate-400 md:block hidden text-white rounded-lg bg-opacity-30 backdrop-blur-sm duration-300 transition-colors hover:bg-white hover:text-black px-3 py-1 absolute bottom-3 right-3">See All</button>
                    </div>
                    <AccordionCategoryMenu accordionData={filtCatData[0]} />
                </div>
            </div>
        </div>

    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export async function getStaticProps({ params }: { params: any }) {


    const catData = await getCategoryData();


    return {
        props: {
            catData,
            categoryMenuParams: params['category-menu']
        }
    }
}
