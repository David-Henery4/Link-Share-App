import { IllustrationEmpty } from "@/components/icons";
import { BaseText } from "@/components/reusable/text";

const EmptyContainer = () => {
  return (
    <div className="w-full my-6 py-5 bg-lightGrey rounded-xl text-center grid gap-6 smallTablet:py-20">
      {/* Illustration Container 250px max-width on tablet & above */}
      <div className="w-full max-w-32 mx-auto">
        <IllustrationEmpty />
      </div>
      <h2 className="font-bold text-2xl">Let’s get you started</h2>
      <BaseText className="max-w-[488px] mx-auto" size="medium">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </BaseText>
    </div>
  );
}

export default EmptyContainer