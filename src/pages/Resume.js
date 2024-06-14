import React, { useState, useLayoutEffect, useRef } from 'react';

function VerticalLineWrapper({ className, children }) {
    const [lineHeight, setLineHeight] = useState(0);
    const wrapperHeight = useRef(null);
  
    useLayoutEffect(() => {
      const handleResize = () => {
        setLineHeight(
          wrapperHeight.current.clientHeight -
          wrapperHeight.current.lastChild.clientHeight
        );
      };
  
      window.addEventListener('resize', handleResize);
      handleResize();
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, [children, lineHeight]);
  
    const beforeStyles = {
      content: '',
      display: 'block',
      position: 'absolute',
      top: 0,
      left: '10px',
      height: `${lineHeight}px`,
      width: '4px',
      background: 'black',
    };
  
    return (
      <section
        ref={wrapperHeight}
        id="vertical--line--wrapper"
        className={`w-full mx-auto my-8 px-4 relative ${className} bg-red-200`}
      >
        <div style={beforeStyles}></div>
        {children}
      </section>
    );
  }

  function VerticalLineContent({ children, className, position }) {
    const contentChildrenStyles = {
      left: position === 'left' ? '0px' : '10px',
      textAlign: position === 'left' ? 'right' : 'left',
    };
  
    return (
      <aside className={`relative mx-auto mt-8 mb-8 pl-2 ${className}`}>
        <span className="absolute top-0 left-0 w-2 h-2 rounded-full block -ml-2"></span>
        <div style={contentChildrenStyles} className="relative top-[-2rem] w-1/2 px-8">
          {children}
        </div>
      </aside>
    );
  }
function Resume() {
    
    return (
        <div className='bg-[#D2D3D6] flex items-center justify-center'>
            <VerticalLineWrapper className="flex-col items-center justify-center">
                <VerticalLineContent position="left">
                    <h1>title</h1>
                    <p>words1</p>
                </VerticalLineContent>
                <VerticalLineContent position="right">
                    <h1>titleagain</h1>
                    <p>words2</p>
                </VerticalLineContent>
            </VerticalLineWrapper>
        </div>
    )
}

export default Resume;