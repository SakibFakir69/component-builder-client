


export const CopyButton = ({ code }: { code: string }) => {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    alert("Copied!");
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-black/70 text-white rounded hover:bg-black"
    >
      Copy
    </button>
  );
};


