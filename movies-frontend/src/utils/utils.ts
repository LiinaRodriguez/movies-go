export const truncateDescription = (description: string, maxLength: number = 100): string => {
  if (description.length > maxLength) {
    return description.substring(0, maxLength) + '...';
  }
  return description;
};