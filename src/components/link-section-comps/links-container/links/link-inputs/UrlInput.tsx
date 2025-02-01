import { LinkIcon } from "@/components/icons";
import useGlobalContext from "@/context/useGlobalContext";

interface UrlInputProps {
  id: string;
  url: string;
}

const UrlInput = ({ url, id }: UrlInputProps) => {
  const {updateLinkValues} = useGlobalContext();
  //
  return (
    <div className="w-full mt-3">
      <label htmlFor="link">Link</label>
      <div className="w-full flex justify-start items-center gap-3 mt-1 px-4 py-3 rounded-lg border border-border hover:border-purple hover:shadow-basicPurple">
        <LinkIcon />
        <input
          onChange={(e) => {
            updateLinkValues(id, "url", e.target.value);
          }}
          value={url}
          className="w-full outline-none bg-lightGrey/0"
          type="url"
          name="link"
          id="link"
        />
      </div>
    </div>
  );
};

export default UrlInput;
