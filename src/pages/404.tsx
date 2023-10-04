import { useRouter } from "next/router";
export default function ErrorPage() {
  const router = useRouter();

  return (
    <div className="bg-[url('https://www.lifepharmacy.com/images/backgrounds/error-bg.jpg')] w-full h-[430px] bg-cover bg-center">
      <div className="w-[70%] mx-auto space-y-5 text-center my-auto translate-y-1/2">
        <h1 className="sm:text-5xl text-center font-semibold text-2xl">
          Error 404
        </h1>
        <p className="sm:text-base text-sm">
          We are sorry, the page you've requested is not available
        </p>
        {/* <ShopNowButton
          onClick={() => router.push("/")}
          classNames="flex space-x-3 rtl:space-x-reverse mx-auto items-center "
        >
          <div className="sm:text-sm text-xs">BACK TO HOME PAGE</div>
          <Icon sizes={"sm"} />
        </ShopNowButton> */}
      </div>
    </div>
  );
}
