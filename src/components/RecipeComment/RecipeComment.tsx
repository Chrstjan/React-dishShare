import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router";
import type { CommentInterface } from "../../lib/types/auth/comment";
import { deleteComment } from "../../lib/actions/recipe/comment/deleteComment";
import s from "./RecipeComment.module.scss";

type RecipeCommentType = {
  data: CommentInterface[] | CommentInterface;
  userId: number | undefined;
  recipeSlug?: string;
};

export const RecipeComment = ({
  data,
  userId,
  recipeSlug,
}: RecipeCommentType) => {
  const { user } = useContext(UserContext);
  const [comments, setComments] = useState<
    CommentInterface[] | CommentInterface | undefined
  >();

  useEffect(() => {
    if (data) {
      console.log(data);
      setComments(Array.isArray(data) ? data : [data]);
    }
  }, [data]);

  const handleDeleteComment = async (id: number) => {
    console.log(id);
    const res = await deleteComment(id, user);

    if (
      res?.data == "Comment deleted successfully" &&
      comments &&
      Array.isArray(comments)
    ) {
      setComments(comments.filter((item) => item.id !== id));
    } else if (
      res.data == "Comment deleted successfully" &&
      !Array.isArray(comments) &&
      comments?.id === id
    ) {
      setComments(undefined);
    }
  };

  return (
    <div className={s.commentContainer}>
      {Array.isArray(comments) ? (
        comments?.map((item: CommentInterface, index) => {
          console.log(item);

          return (
            <>
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
              <p key={index} onClick={() => handleDeleteComment(item?.id)}>
                Delete Comment
              </p>
            </>
          );
        })
      ) : (
        <Link to={`/recipe/${recipeSlug}`}>
          <div className={s.commentStyling} key={comments?.subject}>
            {comments?.user ? (
              <span className={s.userContainer}>
                <h4>
                  {comments?.user?.username}{" "}
                  {comments?.user?.id === userId ? "(creator)" : null}
                </h4>
                <img
                  src={comments?.user?.avatar}
                  alt={comments?.user?.username}
                />
              </span>
            ) : null}
            <header>
              <h4>{comments?.subject}</h4>
            </header>
            <p>{comments?.content}</p>
          </div>
        </Link>
      )}
    </div>
  );
};
