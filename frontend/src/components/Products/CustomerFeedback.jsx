import MockupData from "../../mocks/MockupData";

const CustomerFeedback = () => {
  const customerFeedbackData = MockupData.customerFeedbackData;
  return (
    <div className="flex flex-col items-center justify-center gap-4 w-[80%] mx-auto overflow-hidden">
      <p className="text-black text-sm">Share your feedback with</p>
      <h3 className="text-black text-2xl font-bold">#DeeVu</h3>
      <p className="text-black text-sm text-center">
        See what our customers are saying about our products
      </p>
      <div className="w-full aspect-[16/9] overflow-hidden rounded-lg">
        <img
          src={customerFeedbackData.image}
          alt={customerFeedbackData.id}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CustomerFeedback;
