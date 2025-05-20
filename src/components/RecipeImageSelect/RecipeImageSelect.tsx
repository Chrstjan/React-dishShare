import {
  useContext,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { UserContext } from "../../context/UserContext";
import { useFetch } from "../../hooks/useFetch";
import type { DataInterface } from "../../lib/types/data/data";
import type { UserDataInterface } from "../../lib/types/auth/user";
import type {
  ChosenImageInterface,
  ImageInterface,
} from "../../lib/types/image/image";
import { Modal } from "../Modal/Modal";
import s from "./RecipeImageSelect.module.scss";

export const RecipeImageSelect = ({
  setSelectedImage,
}: {
  setSelectedImage: Dispatch<SetStateAction<ChosenImageInterface | undefined>>;
}) => {
  const { user } = useContext(UserContext);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data, isLoading, error } = useFetch<DataInterface<UserDataInterface>>(
    "https://dishshare.up.railway.app/user",
    {
      headers: {
        Authorization: `Bearer ${user?.access_token}`,
      },
    }
  );

  const handleImageSelect = (image: ImageInterface) => {
    let chosenImage;
    const { id, filename } = { ...image };
    chosenImage = { id, filename };
    setSelectedImage(chosenImage);
  };

  return (
    <>
      <span className={s.imagesContainer}>
        {data && data?.data?.images && !isLoading && !error ? (
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
            <p onClick={() => setShowModal((prev) => !prev)}>Upload image</p>
          </>
        )}
      </span>
      {showModal ? (
        <Modal>
          <span
            className={s.closeBtn}
            onClick={() => setShowModal((prev) => !prev)}
          >
            X
          </span>
        </Modal>
      ) : null}
    </>
  );
};
