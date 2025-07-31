import AppConstants from "../../../constants/AppConstants";
import FormatUtil from "../../../utils/FormatUtil";

const FooterSupportCenter = () => {
  const supportLinks = AppConstants.supportLinks;
  return (
    <div className="col-span-1">
      <h3 className="text-lg font-semibold mb-4">Support Center</h3>
      <ul className="space-y-4">
        {supportLinks.map((link) => (
          <li key={link.index}>
            <a
              href={link.route}
              className="text-sm text-gray-600 hover:text-black"
            >
              {FormatUtil.capitalize(link.name)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSupportCenter;
