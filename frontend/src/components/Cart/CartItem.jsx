import { MdDeleteOutline } from "react-icons/md";
import FormatUtil from "../../utils/FormatUtil.js";

const CartItem = ({ item }) => {
  return (
    <div className="flex items-start border-b py-4 w-full">
      <img
        src={item.image}
        alt={item.name}
        className="h-24 w-22 object-cover shadow-md rounded-sm mr-3"
      />
      <div className="flex w-full justify-between">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm text-title-gray truncate font-title">
            {item.name}
          </h3>
          <p className="text-xs text-content-gray mt-2">
            Size: {item.size} | Color: {item.color}
          </p>
          <div className="flex items-center space-x-4 mt-2">
            <button className="border px-2 rounded-sm border-gray-200 text-sm font-medium">
              -
            </button>
            <span>{item.quantity}</span>
            <button className="border px-2 rounded-sm border-gray-200 text-sm font-medium">
              +
            </button>
            <button className="ml-2">
              <MdDeleteOutline className="h-6 w-6 text-red-600" />
            </button>
          </div>
          <p className="text-sm space-x-2 mt-2">
            <span className="text-red-500 font-semibold">
              {FormatUtil.formatPrice(item.price * 0.8)}
            </span>
            <span className="text-xs italic line-through text-gray-400">
              {FormatUtil.formatPrice(item.price)}
            </span>
          </p>
        </div>
        <div className="relative flex items-center">
          <input
            id="check"
            className="peer h-5 w-5 appearance-none cursor-pointer transition-all duration-200 shadow md:hover:shadow-sm border border-slate-300  checked:bg-topbar-black checked:border-slate-800 rounded"
            type="checkbox"
          />
          <span className="pointer-events-none absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 peer-checked:block text-white text-sm opacity-0 peer-checked:opacity-100">
            ✓
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
