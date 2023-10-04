import { FC } from "react";
import ImgPage from "./img-page";

interface props {
  data: any;
  isDesktop: boolean;
  isMobile: boolean;
}
const DynamicGrid: FC<props> = ({ data, isDesktop, isMobile }) => {
  if (isDesktop === false && isMobile === false) {
    return <></>;
  }

  return (
    <div
      style={{
        gridTemplateColumns: `${
          isDesktop && data.settings.desktop.column > 1
            ? `repeat(${data.settings.desktop.column},auto)`
            : isMobile && data.settings.mobile.column > 1
            ? `repeat(${data.settings.mobile.column},auto)`
            : ""
        }`,
        gridTemplateRows: `${data.settings.mobile.row > 1 ? `` : ""}`,
      }}
      className="grid"
    >
      {data.section_data_array &&
        data.section_data_array.map((sec_data: any) =>
          (sec_data.desktop.is_enabled && isDesktop) ||
          (sec_data.mobile.is_enabled && isMobile) ? (
            (isDesktop && sec_data.desktop.image_url) ||
            (isMobile && sec_data.mobile.image_url) ? (
              <ImgPage
                sectionData={sec_data}
                d_width={data.section_data_array[0].desktop.width}
                isDesktop={isDesktop}
                isMobile={isMobile}
                m_width={data.section_data_array[0].mobile.width}
                m_height={data.section_data_array[0].mobile.height}
              />
            ) : (
              ""
            )
          ) : null
        )}
    </div>
  );
};

export default DynamicGrid;
