//function to convert date into time since the asset uploaded

const formatDate = (inputDate: string | Date): string => {
    const date = new Date(inputDate);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // in seconds
  
    if (diff < 60) return `${Math.floor(diff)} seconds ago`;
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} days ago`;
    if (diff < 31104000) return `${Math.floor(diff / 2592000)} months ago`;
  
    return `${Math.floor(diff / 31104000)} years ago`;
  };

export default formatDate;