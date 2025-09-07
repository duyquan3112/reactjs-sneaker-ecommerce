const FooterCopyRight = () => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="text-left text-xs text-gray-600">
      &copy; {currentYear} Dee Vu. All rights reserved.
    </div>
  );
};

export default FooterCopyRight;
