import LinkContainer from "./links/LinkContainer";
import useGlobalContext from "@/context/useGlobalContext";

const LinksList = () => {
  const { currentLinksList } = useGlobalContext();
  return (
    <div className="w-full my-6 flex flex-col justify-center items-center gap-6">
      {currentLinksList.map((linkInformation, i) => {
        return <LinkContainer key={i} linkIndex={i} {...linkInformation} />;
      })}
    </div>
  );
};

export default LinksList;
