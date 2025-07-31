const FooterSubscribe = () => {
  return (
    <div className="col-span-1 md:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
      <p className="text-sm text-gray-600">
        Subscribe to our newsletter to get the latest news and updates.
      </p>
      <form id="subscribe-form" className="mt-4">
        <div className="flex md:flex-row flex-col items-start md:gap-2 gap-4">
          <input
            id="subscribe-email"
            type="email"
            placeholder="Enter your email"
            className="focus:outline-none w-full md:w-[50%] border-b py-1 border-gray-300"
          />
          <button
            className="bg-topbar-black hover:bg-topbar-black/80 text-white px-4 py-1 rounded-md"
            type="submit"
          >
            Subscibe
          </button>
        </div>
      </form>
    </div>
  );
};

export default FooterSubscribe;
