import styles from "./CircularLoading.module.css";

const CircularLoading = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full py-20">
      <div className={styles.loadingContainer}>
        <div className={styles.loadingOuterAnimation}></div>
        <div className={styles.loadingInnerAnimation}></div>
      </div>
    </div>
  );
};

export default CircularLoading;
