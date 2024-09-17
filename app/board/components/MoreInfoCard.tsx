import Image, { StaticImageData } from "next/image";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Link from "next/link";

// Define the prop types
interface MoreInfoCardProps {
  title: string;
  description: string;
  imgUrl: string | StaticImageData;
  link: string;
}

export const MoreInfoCard: React.FC<MoreInfoCardProps> = ({
  title,
  description,
  imgUrl,
  link,
}) => {
  return (
    <Col xs={12} sm={6} md={4} className="mb-4 mt-4 gap-2">
      <Link href={link} legacyBehavior className="">
        <a target="_blank" rel="noopener noreferrer">
          <div className="proj-imgbx">
            {typeof imgUrl === "string" ? (
              <img className="prjImage" src={imgUrl} alt={title} />
            ) : (
              <Image className="prjImage" src={imgUrl} alt={title} />
            )}
            <div className="proj-txtx">
              <h4>{title}</h4>
              <span>{description}</span>
            </div>
          </div>
        </a>
      </Link>
    </Col>
  );
};
