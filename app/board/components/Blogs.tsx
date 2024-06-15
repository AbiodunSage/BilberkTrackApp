import React from "react";

const Blogs = () => {
  const blog = ["/applycard.png"];
  return (
    <>
      {blog.map((item) => (
        <div>
          <img src={item} alt="images" />
        </div>
      ))}
    </>
  );
};

export default Blogs;
