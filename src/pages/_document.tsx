import { Html, Head, Main, NextScript } from "next/document";
export default function Document({ locale }: { locale: any }) {
  const countryCode = locale ? locale.split("-")[1] : "en";

  const getDirection = (countryCode: any) => {
    debugger;
    if (countryCode === "ar") {
      return "rtl";
    }
    return "ltr";
  };
  return (
    <Html lang="en" dir={getDirection(countryCode)}>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
        <meta
          name="description"
          content="Life Pharmacy is a trusted UAE online pharmacy. Order prescription/OTC medicines online. Explore a wide range of vitamins, medicines, beauty brands, baby care products, and sports supplements. Delivery in 30 minutes, Order Now!"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
