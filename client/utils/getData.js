const getTimeDifferenceDisplay = (createdDate) => {
  const currentDate = new Date(); 
  const differenceInTime = currentDate - new Date(createdDate); 
  const differenceInHours = Math.floor(differenceInTime / (1000 * 3600));
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  if (differenceInDays === 0) {
    if (differenceInHours === 0) {
      return 'Just now';
    } else if (differenceInHours === 1) {
      return '1 hour ago';
    } else {
      return `${differenceInHours} hours ago`;
    }
  } else if (differenceInDays === 1) {
    return '1 day ago';
  } else {
    return `${differenceInDays} days ago`;
  }

}

export default getTimeDifferenceDisplay; 