import { FC } from "react";

import DynamicSliderGrid from "./dynamic-slider-grid";
import DynamicGrid from "./dynamic-grid";
import Products from "./products";
import { Typography } from "./ui/typography";

interface compProps {
  data: any;
}

const PageStructure: FC<compProps> = ({ data }) => {
  const invalidSlugs = [
    "recently-viewed",
    "buy-again",
    "recently-purchased",
    "recommended",
  ];
  const restrictedId = ["c0350501-1e25-4671-93b8-da18a2a0209a"];

  return (
    <>
      {data.section_type === "dynamic_slider_grid" ? (
        <>
          <div className="lg-view-only">
            <DynamicSliderGrid
              data={data}
              isDesktop={false}
              isMobile={
                !data.settings.hide_in_mobile_web ||
                data.settings.hide_in_mobile_web === false
              }
            />
          </div>

          <div className="sm-view-only">
            <DynamicSliderGrid
              data={data}
              isDesktop={
                !data.settings.hide_in_desktop_web ||
                data.settings.hide_in_desktop_web === false
              }
              isMobile={false}
            />
          </div>
        </>
      ) : null}

      <div className="container-page-items">
        {data.section_type === "dynamic_grid" ? (
          <>
            <div
              className={`lg-view-only`}
              style={{ background: data.settings.background_value }}
            >
              {data.settings.show_section_title && (
                <Typography type="h4" size={"lg"} bold={"semibold"}>
                  {data.section_title}
                </Typography>
              )}
              <DynamicGrid
                data={data}
                isDesktop={false}
                isMobile={
                  !data.settings.hide_in_mobile_web ||
                  data.settings.hide_in_mobile_web === false
                }
              />
            </div>
            <div
              className="sm-view-only"
              style={{ background: data.settings.background_value }}
            >
              {data.settings.show_section_title && (
                <Typography type="h4" size={"lg"} bold={"semibold"}>
                  {data.section_title}
                </Typography>
              )}
              <DynamicGrid
                data={data}

                isDesktop={
                  !data.settings.hide_in_desktop_web ||
                  data.settings.hide_in_desktop_web === false
                }
                isMobile={false}
              />
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      {data.section_type === "product_grid" &&
      (data.is_section_visible || data.is_enabled) &&
      !invalidSlugs.includes(data.section_data_object.slug) &&
      !restrictedId.includes(data.section_data_object.id) ? (
        <Products
          slug={data.section_data_object?.slug}
          type_key={data.section_data_object?.type_key}
          proMetadata={data}
        />
      ) : null}
    </>
  );
};

export default PageStructure;
