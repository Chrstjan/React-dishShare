import type { CommentInterface } from "../../lib/types/auth/comment";
import s from "./RecipeComment.module.scss";

type RecipeCommentType = {
  data: CommentInterface[] | CommentInterface;
  userId: number | undefined;
};

export const RecipeComment = ({ data, userId }: RecipeCommentType) => {
  return (
    <div className={s.commentContainer}>
      {Array.isArray(data) ? (
        data?.map((item: CommentInterface) => {
          return (
            <div className={s.commentStyling} key={item?.subject}>
              {item?.user ? (
                <span className={s.userContainer}>
                  <h4>
                    {item?.user?.username}{" "}
                    {item?.user?.id === userId ? "(creator)" : null}
                  </h4>
                  <img src={item?.user?.avatar} alt={item?.user?.username} />
                </span>
              ) : null}
              <header>
                <h4>{item?.subject}</h4>
              </header>
              <p>{item?.content}</p>
            </div>
          );
        })
      ) : (
        <div className={s.commentStyling} key={data?.subject}>
          {data?.user ? (
            <span className={s.userContainer}>
              <h4>
                {data?.user?.username}{" "}
                {data?.user?.id === userId ? "(creator)" : null}
              </h4>
              <img src={data?.user?.avatar} alt={data?.user?.username} />
            </span>
          ) : null}
          <header>
            <h4>{data?.subject}</h4>
          </header>
          <p>{data?.content}</p>
        </div>
      )}
    </div>
  );
};
