export default function CompareArrows({ width = 30, height = 30, className }) {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 30 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <g id="compare_arrows" clipPath="url(#clip0_218_2012)">
        <path 
          id="Vector" 
          d="M11.2625 17.5H2.5V20H11.2625V23.75L16.25 18.75L11.2625 13.75V17.5ZM18.7375 16.25V12.5H27.5V10H18.7375V6.25L13.75 11.25L18.7375 16.25Z" 
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_218_2012">
          <rect width="30" height="30" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  );
} 