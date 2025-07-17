import TitleBar from "./TitleBar";

function About() {
  return (
      <div class="contentbackground">
          <TitleBar title="ABOUT"/>

        <h2>WRITERS</h2>
          <h3 style={{ marginTop: "12px" }}>Todd Bandrowsky</h3>
          <p style={{ marginTop: "0px" }}>Todd is the founder of Country Video Games.  He writes applications and services in C++, C#, JavaScript, short stories and poetry.  He's also rumored to have
learned a few chords on his guitar.</p>
        </div>
  );
}

export default About;
