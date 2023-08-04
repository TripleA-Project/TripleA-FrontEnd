interface ClockAnimationProps {
  className?: string;
}

function ClockAnimation({ className }: ClockAnimationProps) {
  return (
    <div className={`${className ?? ''} h-20 w-10 animate-clock`}>
      <div className="relative h-1/2 w-full rotate-180">
        <svg x="0" y="0" viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <polygon fill="none" stroke="black" strokeWidth="6" points="50,0 100,50 100,100 0,100 0,50" />
        </svg>
        <svg className="absolute bottom-0 left-0 h-full w-full animate-clockTop" x="0" y="0" viewBox="0 0 100 100">
          <polygon fill="black" stroke="none" points="100,50 0,50 50,0" />
        </svg>
      </div>
      <div className="relative h-1/2 w-full">
        <svg x="0" y="0" viewBox="0 0 100 100" className="h-full w-full overflow-visible">
          <polygon fill="none" stroke="black" strokeWidth="6" points="50,0 100,50 100,100 0,100 0,50" />
        </svg>
        <svg
          className="absolute bottom-0 left-0 h-full w-full origin-bottom animate-clockBottom"
          x="0"
          y="0"
          viewBox="0 0 100 100"
        >
          <polygon fill="black" stroke="none" points="50,0 100,50 100,100 0,100 0,50" />
        </svg>
      </div>
    </div>
  );
}

export default ClockAnimation;
