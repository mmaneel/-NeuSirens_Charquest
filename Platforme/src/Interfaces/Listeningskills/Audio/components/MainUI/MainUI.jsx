import "./main-ui.scss";
import ReactiveCanvasOne from "../ReactiveCanvasOne/ReactiveCanvasOne";
export default function MainUI({url}) {
  return (
    <div className="main-ui">
      <ReactiveCanvasOne url={url} />
    </div>
  );
}
