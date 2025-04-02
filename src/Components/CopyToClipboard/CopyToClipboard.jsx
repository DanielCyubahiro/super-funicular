const CopyToClipboard = ({text}) => {
  const writeClipboardText = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
      <button
          onClick={writeClipboardText}
      >
        Copy
      </button>
  );
};

export default CopyToClipboard;