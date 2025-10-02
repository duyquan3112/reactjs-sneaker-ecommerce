import classMerge from "../../utils/TwMerge";

const LineDivider = ({ className }) => {
  return <div className={classMerge(className, "w-full border-t my-2")}></div>;
};

export default LineDivider;
