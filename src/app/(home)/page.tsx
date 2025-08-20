
import { createTimeFrameExtractor } from "@/utils/timeframe-extractor";
import { UsersFetch } from "@/components/Tables/users";

type PropsType = {
  searchParams: Promise<{
    selected_time_frame?: string;
  }>;
};

export default async function Home({ searchParams }: PropsType) {
  const { selected_time_frame } = await searchParams;
  const extractTimeFrame = createTimeFrameExtractor(selected_time_frame);

  return (
    <>
      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-9 2xl:gap-7.5">
        <div className="col-span-12 grid xl:col-span-12">
          <h2 className="mb-4 text-body-2xlg font-bold text-dark dark:text-white">
            Users List
          </h2>
          <UsersFetch />
        </div>
      </div>
    </>
  );
}
