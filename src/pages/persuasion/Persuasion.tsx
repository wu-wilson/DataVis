import Loader from "../../components/loader/Loader";
import styles from "./Persuasion.module.scss";

const Persuasion = () => {
  return (
    <div className={styles["loader"]}>
      <Loader message={"Getting your charts ready..."} />
    </div>
  );
};

export default Persuasion;
