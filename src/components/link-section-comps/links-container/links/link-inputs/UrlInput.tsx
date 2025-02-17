import { LinkIcon } from "@/components/icons";
import useGlobalContext from "@/context/useGlobalContext";
import { BaseText } from "@/components/reusable/text";

interface UrlInputProps {
  id: string;
  url: string;
  errorValues?: {
    id: string;
    url: string[];
  };
}

const UrlInput = ({ url, id, errorValues }: UrlInputProps) => {
  const {updateLinkValues} = useGlobalContext();

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
          className="w-full outline-none bg-lightGrey/0"
          type="url"
          name={`link-${id}`}
          id={`link-${id}`}
        />
        {errorValues?.id && (
          <BaseText className="text-red" size="small">
            {errorValues.url[0]}
          </BaseText>
        )}
      </div>
    </div>
  );
};

export default UrlInput;
