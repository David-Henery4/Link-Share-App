import { LinkIcon } from "@/components/icons";
// import useGlobalContext from "@/context/useGlobalContext";
import { BaseText } from "@/components/reusable/text";
import { LinkErrorDetails, UpdatedPlatformDetails } from "@/types/types";

interface UrlInputProps {
  id: string;
  url: string;
  errorValues?: LinkErrorDetails;
  updateLinkValues: (
    linkId: string,
    valueName: "platform" | "url",
    newValue: string | UpdatedPlatformDetails
  ) => void;
}

const UrlInput = ({ url, id, errorValues, updateLinkValues }: UrlInputProps) => {
  // const { updateLinkValues } = useGlobalContext();

  //
  return (
    <div className="w-full mt-3">
      <label htmlFor={`link-${id}`}>Link</label>
      <div
        className={`w-full flex justify-start items-center gap-3 mt-1 px-4 py-3 rounded-lg border hover:border-purple hover:shadow-basicPurple ${
          errorValues?.id ? "border-red" : "border-border"
        }`}
      >
        <LinkIcon />
        <input
          onChange={(e) => {
            updateLinkValues(id, "url", e.target.value);
          }}
          value={url}
          className="w-full flex-1 outline-none bg-lightGrey/0"
          type="text"
          name={`link-${id}`}
          id={`link-${id}`}
        />
        {errorValues?.id && (
          <BaseText className="text-red" size="small">
            {errorValues.url && errorValues.url[0]}
          </BaseText>
        )}
      </div>
    </div>
  );
};

export default UrlInput;
