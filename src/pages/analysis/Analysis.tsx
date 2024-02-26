import Loader from "../../components/loader/Loader";
import styles from "./Analysis.module.scss";

const Analysis = () => {
  return (
    <div className={styles["loader"]}>
      <Loader message={"Getting your charts ready..."} />
    </div>
  );
};

export default Analysis;
