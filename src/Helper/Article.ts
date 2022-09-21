export const convertTypeMedia = (type: string): 'IMAGE' | 'VIDEO' => {
  if (type.includes('video')) return 'VIDEO';
  return 'IMAGE';
};
