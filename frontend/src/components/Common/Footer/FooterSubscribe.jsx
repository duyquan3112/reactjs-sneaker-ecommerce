import PrimaryButton from "../Buttons/PrimaryButton.jsx";

const FooterSubscribe = () => {
  return (
    <div className="col-span-1 md:col-span-2">
      <h3 className="text-lg font-semibold mb-4">Subscribe</h3>
      <p className="text-sm text-gray-600">
        Subscribe to our newsletter to get the latest news and updates.
      </p>
      <form id="subscribe-form" className="mt-4">
        <div className="flex lg:flex-row flex-col items-start lg:items-end lg:gap-2 gap-4">
          <input
            id="subscribe-email"
            type="email"
            placeholder="Enter your email"
            className="focus:outline-none w-full lg:w-[50%] border-b py-1 border-gray-300"
          />
          <PrimaryButton type="submit">Subscibe</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default FooterSubscribe;
