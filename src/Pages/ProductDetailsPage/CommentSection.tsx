import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsByPostIdQuery,
  useReplyCommentByCIDQuery,
  useReplyCommentMutation,
  useUpdateCommentMutation,
} from "../../Redux/features/produtcs/orderApi";
import Swal from "sweetalert2";
import { useGetUserByUserIdQuery } from "../../Redux/user/userApi";
import { useGetVendorByIdQuery } from "../../Redux/features/vendor/vendorApi";
import StarRatings from "react-star-ratings";
type pro = {
  productId: string;
  vendorId: string;
};

type User = {
  userId: string;
  email: string;
};

const CommentSection = ({ productId, vendorId }: pro) => {
  const user = useSelector((state: RootState) => state.auth.user as User);
  const {
    data: userData,
    error,
    isLoading,
  } = useGetUserByUserIdQuery(user.userId);
  const { data: vendorData } = useGetVendorByIdQuery(vendorId);
  const {
    data: commentsData,
    isLoading: isCommentsLoading,
    error: commentsError,
    refetch: refetchComments,
  } = useGetCommentsByPostIdQuery(productId, { skip: !productId });
  const [replyComment] = useReplyCommentMutation();
  const [commentText, setCommentText] = useState("");
  const [editCommentId, setEditCommentId] = useState<string | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [postComment, { isLoading: isPosting }] = useCreateCommentMutation();
  const [updateComment] = useUpdateCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();

  const userName = userData?.data.name || [];
  const vendor = vendorData?.data || [];
  const comments = commentsData?.data || [];
  console.log("comments", comments);
  console.log("vendor", vendorData);

  const handlePostComment = async () => {
    if (!commentText.trim()) return;
    const newComment = {
      userId: user?.userId,
      userEmail: user?.email,
      userName,
      productId,
      vendorId,
      comment: commentText,
      rating: 0,
    };
    try {
      await postComment(newComment).unwrap();
      setCommentText("");
      Swal.fire("Comment posted successfully");
      refetchComments();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
  };

  const handleUpdateComment = async (commentId: string) => {
    if (!editedCommentText.trim()) return;
    try {
      await updateComment({ commentId, comment: editedCommentText }).unwrap();
      setEditCommentId(null);
      setEditedCommentText("");
      Swal.fire("Comment updated successfully");
      refetchComments();
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId).unwrap();
      Swal.fire("Comment deleted successfully");
      refetchComments();
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null
  );
  const [replyingCommentId, setReplyingCommentId] = useState<string | null>(
    null
  );

  const [replyText, setReplyText] = useState("");
  const { data: repliesData, refetch: refetchReplies } =
    useReplyCommentByCIDQuery(replyingCommentId);
  //   const { data: replies, refetch: refetchReplies } =
  //     useReplyCommentByCIDQuery(replyingCommentId);
  const replies = repliesData?.data || [];
  console.log("repliesCommentId", replyingCommentId);
  console.log("replies", replies);
  const handleReplyClick = (commentId: string) => {
    setReplyingToCommentId(
      commentId === replyingToCommentId ? null : commentId
    );
  };

  // const handleReplyChange = (e) => {
  //   setReplyText(e.target.value); // Update the reply text
  // };
  const handleSubmitReply = async (commentId: string) => {
    const replyData = {
      vendorEmail: vendor.email,
      shopName: vendor.shopName,
      commentId,
      userId: user?.userId,
      userEmail: user?.email,
      userName,
      productId,
      vendorId,
      repliesComment: replyText,
    };
    console.log("replyData", replyData);
    try {
      await replyComment(replyData).unwrap();
      setReplyText(""); // Clear the input after submission
      setReplyingToCommentId(null);
      refetchReplies();
    } catch (error) {
      console.error("Failed to post comment:", error);
    }

    // Swal.fire(`Reply submitted for comment ID: ${commentId},${replyText}`);
    // setReplyText(""); // Clear the input after submission
    // setReplyingToCommentId(null); // Close the input box after submission
  };

  const [showReplies, setShowReplies] = useState(false);
  console.log(showReplies);
  const handleShowReplies = (commentId: string) => {
    setReplyingCommentId(commentId);

    setShowReplies(true);
    // Swal.fire(`Reply submitted for comment ID: ${commentId} `);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading post details</div>;

  console.log("productId", productId);
  return (
    <div className="w-screen min-h-screen flex   justify-center bg-gray-200">
      <div className="w-2/3 flex flex-row justify-center border border-2 border-red-500">
        <div className="mt-4 ">
          <h2 className="text-xl font-semibold mb-2 text-black">Comments</h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Type your comment"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              className="input input-bordered input-info w-full bg-white text-black"
            />
            <button
              className="btn btn-primary"
              onClick={handlePostComment}
              disabled={isPosting}
            >
              {isPosting ? "Posting..." : "Post Comment"}
            </button>
          </div>
          {isCommentsLoading ? (
            <div>Loading comments...</div>
          ) : commentsError ? (
            <div>Error loading comments</div>
          ) : (
            <div>
              {comments && comments.length > 0 ? (
                comments.map((comment: TComment) => (
                  <div key={comment.commentId} className="mb-2">
                    {editCommentId === comment.commentId ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          placeholder="Write your reply"
                          className="input input-bordered input-sm w-full input-info bg-white text-black"
                        />
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => handleUpdateComment(comment.commentId)}
                        >
                          Update
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => {
                            setEditCommentId(null);
                            setEditedCommentText("");
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <p>
                            <span className="text-blue-500 pr-2 text-lg font-semibold">
                              {comment.userName}:
                            </span>
                            <span className="text-black text-lg font-medium">
                              {comment.comment}
                              <span className="pl-2">
                                <StarRatings
                                  rating={comment.rating}
                                  starRatedColor="#f39c12"
                                  numberOfStars={5}
                                  name="rating"
                                  starDimension="15px"
                                  starSpacing="1px"
                                />
                              </span>
                            </span>
                          </p>
                          {/*  Replies portion */}
                          <div className="pl-12">
                            <span>
                              <button
                                onClick={() =>
                                  handleReplyClick(comment.commentId)
                                }
                              >
                                {replyingToCommentId === comment.commentId ? (
                                  <button className="text-blue-700">
                                    Cancel
                                  </button>
                                ) : (
                                  <button className="text-blue-700">
                                    Reply
                                  </button>
                                )}
                              </button>
                              {replyingToCommentId === comment.commentId && (
                                <div>
                                  <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) =>
                                      setReplyText(e.target.value)
                                    }
                                    placeholder="Type your reply..."
                                    className="input input-bordered input-sm input-info bg-white text-black"
                                  />
                                  <button
                                    onClick={() =>
                                      handleSubmitReply(comment.commentId)
                                    }
                                    className="btn btn-sm btn-primary ml-2"
                                  >
                                    Submit
                                  </button>
                                </div>
                              )}
                            </span>
                            {/*  Replies portion */}
                            <span>
                              <button
                                className="pl-5"
                                onClick={() =>
                                  handleShowReplies(comment.commentId)
                                }
                              >
                                {/* {showReplies ? "Hide" : "Show All"} */}
                                {replyingCommentId === comment.commentId ? (
                                  ""
                                ) : (
                                  <button className="text-blue-700">
                                    Show Replies
                                  </button>
                                )}
                              </button>
                              {replyingCommentId === comment.commentId && (
                                <>
                                  {replies && replies.length > 0 ? (
                                    replies.map((reply: TComment) => (
                                      <p
                                        key={reply.replyCommentId}
                                        className="pl-4 text-black"
                                      >
                                        <span className="text-blue-700">
                                          Replied:
                                          <span className="px-2">
                                            {reply.shopName}:
                                          </span>
                                        </span>
                                        {reply.repliesComment}
                                      </p>
                                    ))
                                  ) : (
                                    <p className="pl-4 text-black">
                                      No replies yet
                                    </p>
                                  )}
                                </>
                              )}
                            </span>
                          </div>
                        </div>
                        {comment.userId === user.userId && (
                          <div className="flex gap-2">
                            <button
                              className="btn btn-sm btn-primary"
                              onClick={() => {
                                setEditCommentId(comment.commentId);
                                setEditedCommentText(comment.comment);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-sm btn-secondary"
                              onClick={() =>
                                handleDeleteComment(comment.commentId)
                              }
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div>No comments yet</div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
