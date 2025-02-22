export const NumberList = ({ children }) => {
  return (
    <ul className="pl-10 list-decimal list-outside font-light">{children}</ul>
  );
};

export const BulletList = ({ children }) => {
  return (
    <ul className="pl-10 list-disc list-outside font-light">{children}</ul>
  );
};
