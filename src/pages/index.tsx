import { useState, useEffect } from "react";
import getHomePageData from "@/lib/getHomePageData";
import PageStructure from "@/components/page-structure";
import InfiniteScroll from "react-infinite-scroll-component";


export default function Home({
  homePageData
}: {
  homePageData: any;
  locale: any;
}) {
  const [content, setContent] = useState<any>(homePageData.data.content.slice(0, 13));
  const [hasMore, setHasMore] = useState(homePageData.data.content.length > 13);

  const loadMore = () => {
    const remainingContent = homePageData.data.content.slice(content.length);
    const nextBatch = remainingContent.slice(0, 5);
    setContent((prevContent: any) => [...prevContent, ...nextBatch]);

    if (
      content.length + nextBatch.length ===
      homePageData.data.content.length
    ) {
      setHasMore(false);
    }
  };


  const fetchMoreData = () => {
    if (hasMore) {
      loadMore();
    }
  };
  useEffect(() => {
    setContent(homePageData.data.content.slice(0, 13));
  }, [homePageData]);

  return (
    <InfiniteScroll
      dataLength={content ? content.length : 0}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={null}
      scrollThreshold={0.2}
    >
      {content &&
        content.map((data: any, ind: number) => (
          <PageStructure data={data} key={ind} />
        ))}
    </InfiniteScroll>
  );
}


export async function getStaticProps({ locale }: { locale: any }) {
  const homePageData = await getHomePageData(locale);

  return {
    props: {
      homePageData,
    },
  };
}
