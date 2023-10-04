import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";
import { Icon } from "./ui/icons";

const BreadCrumb = ({ type, menuData }: {  type: string, menuData:string[] }) => {



  function generatedUrl(indx: number) {
    let generatedUrl = "/";
    menuData.slice(0, indx + 1).map((itemName: string) => {
      generatedUrl += slugify(itemName) + "/";
    });
    if (type === "category" || type === "category-menu") {
      return `/${type}${generatedUrl}`;
    } else {
      return `${generatedUrl}`;
    }
  }

  function slugify(text: string) {
    return text.toLowerCase().replace(/[\/\s&]+/g, "-");
  }
  const IsLastItem = (indx: number) => menuData.length - 1 !== indx;

  return (
    <nav
      className=" px-2 sm:py-3 py-2 text-gray-700 flex overflow-x-auto no-scrollbar border-muted border-b"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 rtl:space-x-reverse">
        <li className="inline-flex items-center">
          <Link
            href={`/`}
            className={cn(
              `ml-1 capitalize`,
              buttonVariants({ variant: "footerLink", size: "sm" })
            )}
          >
            Home
          </Link>
        </li>
        {menuData.map((item: any, indx: number) => (
          <li>
            <div className="flex items-center">
              <Icon type="chevronRightIcon" sizes={"sm"} />
              <Link
                href={`${IsLastItem(indx) ? generatedUrl(indx):"#"}`}
                className={cn(
                  `ml-1 capitalize`,
                  buttonVariants({ variant: "footerLink", size: "sm" })
             
                )}
              >
                <span className="whitespace-nowrap">{item}</span> 
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumb;
