const CommentWrapper = ({ children }: { children: JSX.Element }) => {
  return (
    <div className="my-8 grid grid-cols-1 gap-4 rounded-lg border bg-white p-4 shadow-lg">
      {children}
    </div>
  );
};

export default CommentWrapper;
