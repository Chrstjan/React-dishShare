import s from "./ImagePreview.module.scss";

type ImagePreviewType = {
  image?: string | undefined;
  type?: string;
  action?: () => void;
};

export const ImagePreview = ({ image, type, action }: ImagePreviewType) => {
  return (
    <>
      {image ? (
        <img
          onClick={action}
          className={`${s.previewStyling} ${type ? s[type] : ""}`}
          src={image}
          alt="Recipe image preview"
        />
      ) : null}
    </>
  );
};
