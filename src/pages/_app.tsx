import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Layout } from "@/components/layout";
import getCategoryData from "@/lib/getCategoryData";
import getBrandsData from "@/lib/getBrandsData";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import { ModalProvider } from "@/components/ui/modalcontext";
import { Toaster } from "@/components/ui/toast";
import { Poppins } from "next/font/google";

type TProps = AppProps & {
  data: any;
  brands_data: any;
  session: any;
  userAddrData: any;
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const App = ({ Component, data, brands_data, pageProps }: TProps) => {
  return (
    <>
      <Head>
        <title>
          Life Pharmacy UAE - Online Pharmacy Delivery in 30 minutes
        </title>
      </Head>
      <NextNProgress color="#eba834" />
      <SessionProvider>
        <main className={poppins.className}>
          <Toaster position="top-right" />
          <ModalProvider>
            <Layout data={data} brands_data={brands_data}>
              <Component {...pageProps} />
            </Layout>
          </ModalProvider>
        </main>
      </SessionProvider>
    </>
  );
};

App.getInitialProps = async () => {
  const data = await getCategoryData();

  const brands_data = await getBrandsData(false);

  return {
    data,
    brands_data,
  };
};

export default App;
