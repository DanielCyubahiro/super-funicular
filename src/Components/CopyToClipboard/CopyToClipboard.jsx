import {useEffect, useState} from 'react';

const CopyToClipboard = ({text}) => {
  const [isCopied, setCopied] = useState(false);

  const writeClipboardText = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    let timer;
    if (isCopied) {
      timer = setTimeout(() =>
          setCopied(false), 3 * 1000,
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isCopied]);

  return (
      <button
          onClick={writeClipboardText}
      >
        {isCopied ? 'Successfully copied!' : 'Copy'}
      </button>
  );
};

export default CopyToClipboard;