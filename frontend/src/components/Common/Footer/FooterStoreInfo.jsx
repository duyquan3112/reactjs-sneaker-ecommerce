import { IoCallOutline, IoMailOutline } from "react-icons/io5";

const FooterStoreInfo = () => {
  return (
    <div className="col-span-1 md:col-span-2">
      <h3 className="text-3xl font-semibold mb-4">Dee Vu</h3>
      <div className="space-y-4 text-sm text-gray-600">
        <p className="font-medium">
          123 ABC Street, Tan Dinh Ward, Ho Chi Minh City, Vietnam
        </p>
        <div className="flex items-center gap-2">
          <IoCallOutline className="h-4 w-4 object-contain" />
          <a href="tel:+84778906231" className="hover:text-black">
            +84 77 890 6231
          </a>
        </div>
        <div className="flex items-center gap-2">
          <IoMailOutline className="h-4 w-4 object-contain" />
          <a href="mailto:deevu@gmail.com" className="hover:text-black">
            deevu@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default FooterStoreInfo;
