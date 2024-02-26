import Particles from "./components/particles/Particles";
import themes from "./_themes.module.scss";

const App = () => {
  return (
    <div>
      <Particles num={40} radius={6} color={themes["primary_color"]} />
    </div>
  );
};

export default App;
