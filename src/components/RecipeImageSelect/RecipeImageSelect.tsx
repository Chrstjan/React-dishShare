import { useFieldArray, type Control, type FieldValues } from "react-hook-form";
import { useContext, type Dispatch, type SetStateAction } from "react";
import { UserContext } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import type { DataInterface } from "../../lib/types/data/data";
import type { UserDataInterface } from "../../lib/types/auth/user";
import type { ImageInterface } from "../../lib/types/image/image";
import s from "./RecipeImageSelect.module.scss";

type RecipeImageSelectType = {
  control: Control<FieldValues>;
  setImagePreview: Dispatch<SetStateAction<string>>;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

export const RecipeImageSelect = ({
  control,
  setImagePreview,
  setIsModalOpen,
}: RecipeImageSelectType) => {
  const { user } = useContext(UserContext);

  const { append } = useFieldArray({
    control,
    name: "image",
  });

  const { data, isLoading, error } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const handleImageSelect = (image: ImageInterface) => {
    console.log(image);
    append({ image_id: image?.id, filename: image?.filename });
    setImagePreview(
      image && image?.filename?.length > 0 ? image?.filename : ""
    );
    setIsModalOpen((prev) => !prev);
  };

  return (
    <>
      <span className={s.imagesContainer}>
        {data && data?.data && data?.data?.images && !isLoading && !error ? (
          data?.data?.images?.map((item: ImageInterface) => {
            return (
              <img
                onClick={() => handleImageSelect(item)}
                className={s.imageStyling}
                key={item?.id}
                src={item?.filename}
                alt={item?.description}
              />
            );
          })
        ) : (
          <>
            <p>No images found</p>
          </>
        )}
      </span>
    </>
  );
};
