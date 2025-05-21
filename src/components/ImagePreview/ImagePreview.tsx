import s from "./ImagePreview.module.scss";

type ImagePreviewType = {
  image?: string | undefined;
};

export const ImagePreview = ({ image }: ImagePreviewType) => {
  return (
    <>
      {image ? (
        <img
          className={s.previewStyling}
          src={image}
          alt="Recipe image preview"
        />
      ) : null}
    </>
  );
};
