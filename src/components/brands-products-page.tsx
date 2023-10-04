import ProductsPageData from "./products-page-data"
import { useState } from "react"
import { SingleProductData } from "./single-product-data"
import { ProductsSkeleton } from "./productsSkeleton"
import Image from "next/image"
import BreadCrumb from "./breadcrumb"
import Link from "next/link"

const BrandsProductsPage = ({ data, menuData, brandPara }: { data: any, menuData: any, brandPara: any }) => {
    const [productFilterApplied, setProductsFilterApplied] = useState(false)
    const skeletonArray = Array(12).fill(<ProductsSkeleton />)
    const [isRowView, setIsRowView] = useState(false)


    return (
        <>
            <div className="max-w-[1450px] mx-auto  sm:px-[10px] px-[5px]">
                {data.brand_details.images.banner ?
                    <div className=''>
                        <Image src={data.brand_details.images.banner} height={500} width={1440} alt="headerimg" className='object-cover lg:h-[20rem] md:h-[15rem] w-full mx-auto' />
                        <BreadCrumb menuData={menuData} type={"brands"}/>
                    </div> :
                    <>
                        <div className=" h-[12em] px-[10px] grid items-center mx-auto bg-[url('https://www.lifepharmacy.com/images/page-header-bg.jpg')] relative bg-repeat-y">
                            <div className='my-auto space-y-2'>
                                {menuData[0] ? <h1 className='text-4xl text-center capitalize'>{menuData[0]}</h1> : null}
                                <h1 className='text-2xl  text-center   capitalize text-blue-500'>{menuData[1] ? String(menuData[1]).toLowerCase().replace(/-/g, ' ') : " Products"} </h1>
                            </div>
                        </div>
                        <BreadCrumb menuData={menuData} type={"brands"}/>
                    </>
                }
                <div className="grid grid-cols-1 gap-x-8 gap-y-5 lg:grid-cols-4">
                    <div className="hidden lg:block space-y-2">
                        <h1 className="font-bold">Category</h1>
                        {data.categories.map((cat_data: any) => (
                            <div className="flex justify-between text-gray-800 text-sm">
                                <Link href={`/brand/${brandPara}/${cat_data.slug}`} className={`${menuData[1] === cat_data.name.toLowerCase() ? "text-blue-500" : ""} hover:text-blue-500`}>{cat_data.name}</Link>
                                <div>{cat_data.count}</div>
                            </div>
                        )
                        )}
                    </div>
                    <div className="col-span-3">
                        <div className={`grid ${isRowView? "!grid-cols-1 !gap-0" : ""} xl:grid-cols-4 lg:grid-cols-3  md:grid-cols-2 min-[300px]:grid-cols-2 grid-cols-1 sm:gap-3 gap-1`}>
                            {data.products.length > 0 ? data.products.map((pro_data: any) => (
                                productFilterApplied ?
                                    skeletonArray.map(sk =>
                                        sk
                                    ) :
                                    <SingleProductData pro_data={pro_data} isRowView={isRowView}/>
                            ))
                                : <div className="w-full col-span-3">
                                    <h1 className="text-blue-500 text-center py-2">No Products Found</h1>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


export default BrandsProductsPage