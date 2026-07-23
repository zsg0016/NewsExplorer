import "./Preloader.css";

function Preloader({ text }) {
  return (
    <div className="preloader">
      <div className="preloader__container">
        <div className="circle-preloader"></div>
        <p className="preloader__text">{text || "Loading..."}</p>
      </div>
    </div>
  );
}

export default Preloader;
