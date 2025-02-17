import { useEffect, useRef } from "react";
import c from "./home.module.scss";
const Face = ({ faceRef }) => {
  //   const prevPositionRef = useRef(position);

  //   useEffect(() => {
  //     // Check if the position has changed
  //     if (
  //       prevPositionRef.current[0] !== position[0] ||
  //       prevPositionRef.current[1] !== position[1]
  //     ) {
  //       prevPositionRef.current = position; // Update the ref
  //     }
  //   }, [position]);
  //   console.log(position);
  return (
    <div
      ref={faceRef}
      className={c.face}
      //   style={{
      //     top: position[1], // Adjust the vertical position
      //     left: position[0],
      //   }} // Set the horizontal position
    >
      <svg
        width="148"
        height="148"
        viewBox="0 0 148 148"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="74" cy="74" r="74" fill="#FF7EC4" />
        <path
          d="M70.6147 53.3214C70.2932 56.7219 67.2759 59.2178 63.8754 58.8962C60.4749 58.5747 57.979 55.5574 58.3006 52.157C58.6221 48.7566 61.6394 46.2607 65.0399 46.5822C68.4404 46.9038 70.9363 49.921 70.6147 53.3214Z"
          fill="black"
        />
        <path
          d="M92.8657 55.6164C92.5441 59.0168 89.5268 61.5127 86.1264 61.1911C82.7259 60.8696 80.23 57.8523 80.5515 54.4519C80.8731 51.0515 83.8904 48.5556 87.2909 48.8771C90.6913 49.1987 93.1873 52.2159 92.8657 55.6164Z"
          fill="black"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M51.6477 71.9591C53.8434 72.0919 55.4729 73.9951 55.7809 76.1733C57.0667 85.2668 64.6022 92.5069 74.1253 93.0827C83.6484 93.6585 92.0013 87.3791 94.3734 78.5067C94.9416 76.3815 96.7885 74.6885 98.9842 74.8212V74.8212C101.18 74.954 102.882 76.8537 102.438 79.0083C99.7062 92.2816 87.566 101.876 73.6445 101.034C59.723 100.193 48.8272 89.2054 47.7143 75.6995C47.5336 73.5072 49.4519 71.8264 51.6477 71.9591V71.9591Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
export default Face;
