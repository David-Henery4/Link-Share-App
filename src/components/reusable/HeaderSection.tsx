import { Heading, BaseText } from "./text";

interface HeaderTypes {
  title: string;
  description: string;
}

const HeaderSection = ({ description, title }: HeaderTypes) => {
  return (
    <header className="text-left">
      <div>
        <Heading size="small" className="lgMob:text-[32px]">
          {title}
        </Heading>
        <BaseText size="medium" className="mt-2">
          {description}
        </BaseText>
      </div>
    </header>
  );
};

export default HeaderSection;
