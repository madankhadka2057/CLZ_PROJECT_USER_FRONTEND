// import { useEffect } from 'react';
// import { useLocation } from 'react-router-dom';

// const ScrollManager = () => {
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => {
//       sessionStorage.setItem('scrollPosition', window.scrollY);
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   useEffect(() => {
//     const scrollPosition = sessionStorage.getItem('scrollPosition');
//     if (scrollPosition) {
//       window.scrollTo({
//         top: parseInt(scrollPosition, 10),
//         behavior: 'smooth',
//       });
//     }
//   }, [location]);

//   return null;
// };

// export default ScrollManager;
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    // Check if the current location is the home page
    if (location.pathname === '/home') {
        
      const scrollPosition = sessionStorage.getItem('scrollPosition');
      if (scrollPosition==0) {
        window.scrollTo({
          top:'100%',
          behavior: 'smooth',
        });
      }
    }
    // if (location.pathname === '/product') {
    //     console.log(location.pathname)
    //   const scrollPosition = sessionStorage.getItem('scrollPosition');
    //   console.log(parseInt(scrollPosition, 10))
    //   if (scrollPosition) {
    //     window.scrollTo({
    //       top: 0,
    //       behavior: 'smooth',
    //     });
    //   }
    // }
  }, [location]);

  return null;
};

export default ScrollManager;

