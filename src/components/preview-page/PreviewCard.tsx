import { CardHeader, CardLinks } from "./card-comps";

const PreviewCard = async ({ userIdParam }: { userIdParam: string }) => {
  //
  return (
    <div className="smMob:px-14 smMob:py-12 smMob:rounded-3xl smMob:bg-white smMob:shadow-card">
      {/* CARD HEADER */}
      <CardHeader userIdParam={userIdParam}/>

      {/* CARD Links */}
      <CardLinks userIdParam={userIdParam}/>
    </div>
  );
};

export default PreviewCard;
