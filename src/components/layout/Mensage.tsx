import { useState, useEffect } from 'react';

interface Props {
  text: string;
  type: string;
}

const MensageApp = ({ text, type }: Props) => {
  const [showMessage, setShowMessage] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowMessage(false);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  let css = '';

  if (type === 'error') {
    css = 'bg-red-600/10 border-red-600/40';
  }
  if (type === 'c_error') {
    css = 'bg-red-600/60 border-red-600/80';
  }
  if (type === 'success') {
    css = 'bg-green/20 border-green/40';
  }
  if (type === 'c_success') {
    css = 'bg-green border-green';
  }

  return (
    <div
      className={`${css} py-2 px-8 border w-full rounded-sm text-center text-white/60 my-2 ${
        showMessage ? 'inline-block' : 'hidden'
      }
      `}
    >
      {text}
    </div>
  );
};

export default MensageApp;
