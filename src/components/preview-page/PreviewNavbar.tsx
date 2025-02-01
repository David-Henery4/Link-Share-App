import Button from "@/components/reusable/Button";
import ShareLinkBtn from "./ShareLinkBtn";

const PreviewNavbar = () => {
  //
  return (
    <nav className="w-full px-4 py-6 smMob:px-6">
      <menu className="w-full flex justify-between items-center gap-4 smMob:px-6 smMob:py-4 smMob:rounded-xl smMob:bg-white">
        <li>
          <Button
            className="block"
            buttonType="secondary"
            isLink={true}
            href="/"
          >
            Back to Edit
          </Button>
        </li>
        <li>
          <ShareLinkBtn/>
        </li>
      </menu>
    </nav>
  );
};

export default PreviewNavbar;
