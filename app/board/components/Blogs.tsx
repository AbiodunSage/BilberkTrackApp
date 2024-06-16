import Image from "next/image";
import React from "react";

const Blogs = () => {
  const blog = ["/applycard.png"];
  return (
    <>
      {blog.map((item) => (
        <div key={item}>
          <Image
            src={item}
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      ))}
    </>
  );
};

export default Blogs;
