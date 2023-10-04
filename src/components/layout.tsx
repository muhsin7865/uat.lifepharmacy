import Navbar from "./navbar"
import Footer from "./footer"
import React from "react"
import { Providers } from "../redux/providers"
import { FC } from "react"

interface layoutProps {
  children: any
  data: any,
  brands_data: any,
}

export const Layout: FC<layoutProps> = ({ children, data, brands_data}) => {

  return (
    <Providers>
      <section className="py-0" >
        <Navbar data={data} brands_data={brands_data}  />
        {children}
        <Footer  />
      </section>
    </Providers>
  )
}


