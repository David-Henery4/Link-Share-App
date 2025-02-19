const DevToIcon = ({ isPreview = false }: { isPreview?: boolean }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      className={`${
        isPreview ? "fill-white" : "fill-grey group-hover:fill-purple"
      }`}
    >
      <g clipPath="url(#a)">
        <path d="M12.25 0h-8.5A3.75 3.75 0 0 0 0 3.75v8.5A3.75 3.75 0 0 0 3.75 16h8.5A3.75 3.75 0 0 0 16 12.25v-8.5A3.75 3.75 0 0 0 12.25 0Z" />
        <path
          fill={`${isPreview ? "#000" : "#fff"}`}
          fillRule="evenodd"
          d="M5.46 9.201c0 .639-.393 1.606-1.638 1.604H2.25V5.188h1.605c1.201 0 1.605.966 1.606 1.605V9.2ZM3.912 6.24c.132 0 .264.049.395.147.131.099.197.247.198.444v2.365c0 .197-.066.345-.197.443a.657.657 0 0 1-.395.148H3.32V6.239h.591Z"
          clipRule="evenodd"
        />
        <path
          fill={`${isPreview ? "#000" : "#fff"}`}
          d="M8.872 6.19H7.067v1.305h1.104V8.5H7.067v1.304h1.806v1.004H6.766a.685.685 0 0 1-.702-.668V5.89a.686.686 0 0 1 .668-.703h2.14v1.003Zm3.512 3.915c-.447 1.044-1.248.836-1.607 0L9.47 5.19h1.104l1.007 3.861 1.001-3.861h1.104l-1.303 4.916Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h16v16H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DevToIcon;
