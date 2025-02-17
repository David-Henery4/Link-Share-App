import Button from "./reusable/Button";

const SaveButton = ({ formId }: { formId: string }) => {
  return (
    <div className="w-full mt-auto border-t border-border p-4 lgMob:py-6 lgMob:px-10 mediumTablet:flex mediumTablet:justify-end">
      <Button
        form={formId}
        // disabled={true} // temp obvs
        buttonType="primary"
        size="large"
        className="mediumTablet:w-auto target:ml-auto"
      >
        Save
      </Button>
    </div>
  );
};

export default SaveButton;
