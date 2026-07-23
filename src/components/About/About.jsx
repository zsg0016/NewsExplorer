import "./About.css";
import ABOUT_IMAGE from "../../images/Zachary_Guidry.jpg";

function About() {
  return (
    <div className="about">
      <img
        className="about__image"
        alt="Image of the Author: Zachary Guidry"
        src={ABOUT_IMAGE}
      />
      <div className="about__right">
        <h1 className="about__title">About the Author</h1>
        <p className="about__text">
          I am a software engineering student currently attending TripleTen
          bootcamp, building my skills in HTML, CSS, and Javascript with respect
          to the React Framework. Latest project involved creating an API for
          data manipulation. I have a bachelors of computer science from the
          University of North Texas. My strengths that make me unique are
          independence and objective judgement. Strong desire to learn and
          contribute to world-changing technology. I look forward to using my
          innovation and reliability in the field of software development to
          create innovative technology that will have a positive impact on the
          world.
        </p>
      </div>
    </div>
  );
}

export default About;
