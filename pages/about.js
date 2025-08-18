export default function AboutPage() {
  return `
    <main>
      <!-- Hero / Intro -->
      <header class="searchable-section header container-fluid d-flex align-items-center py-5" style="height: 467px">
        <div class="container row mx-auto d-flex justify-content-between align-items-center">
          <div class="col-md-8 fade-slide-up">
            <button class="section_btn mb-3 bg-warning">About us</button>
            <h1 class="head1">5 years of helping designers unlock their true potential</h1>
            <p class="lorem mt-3 text-white fw-semibold">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit sed nec justo tempus.
            </p>
          </div>
        </div>
      </header>

      <section class="searchable-section story container-fluid bg-white">
        <div class="container row mx-auto align-items-center justify-content-between" style="padding: 100px 0 50px 0;">
          <div class="col-md-5 fade-slide-up">
            <h1 class="head1 fw-bold">Learnico is a multidisciplinary education platform</h1>
          </div>
          <div class="col-md-6 fade-slide-up">
            <p class="lorem">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique. 
              Duis cursus, mi quis viverra ornare, eros dolor interdum nulla.
            </p>
            <div class="about-numbers d-grid text-center">
              <div class="about-numbers-text-wrapper">
                <div class="mb-1">
                  <div class="heading-xlarge text-secondary">2017</div>
                </div>
                <div>Founded</div>
              </div>
              <div class="about-numbers-text-wrapper">
                <div class="mb-1">
                  <div class="heading-xlarge text-secondary">40+</div>
                </div>
                <div>Courses created</div>
              </div>
            </div>
          </div>
        </div>

        <div class="container fade-slide-up">
          <img src="./images/about_page_img.jpg" alt="About us" class="img-fluid rounded-5">
        </div>
      </section>

      <section class="searchable-section trending container-fluid py-5 bg-white">
        <div class="fade-slide-up container text-center pt-5">
          <button class="section_btn bg-warning">About us</button>
          <h2 class="head2 mt-3 fw-bold">People come first</h2>
          <p class="lorem">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
            elementum tristique. Duis cursus, mi quis viverra ornare.
          </p>
        </div>
      </section>

      <!-- Our Team -->
      <section class="searchable-section team container-fluid py-5 bg-white">
        <div class="container text-center">
          <button class="section_btn mb-3">Our Team</button>
          <h2 class="head2">Meet the people behind our mission</h2>
          <p class="lorem mb-5">A passionate team dedicated to no-code education.</p>
          <div class="row justify-content-center">
            <div class="col-md-3 fade-left-up mb-4">
              <img src="./images/team1.jpg" alt="Team member" class="img-fluid rounded-circle mb-3">
              <h4>Jane Doe</h4>
              <p class="lorem">Founder & CEO</p>
            </div>
            <div class="col-md-3 fade-slide-up mb-4">
              <img src="./images/team2.jpg" alt="Team member" class="img-fluid rounded-circle mb-3">
              <h4>John Smith</h4>
              <p class="lorem">Head of Design</p>
            </div>
            <div class="col-md-3 fade-right-up mb-4">
              <img src="./images/team3.jpg" alt="Team member" class="img-fluid rounded-circle mb-3">
              <h4>Emily Brown</h4>
              <p class="lorem">Lead Instructor</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Call to Action -->
      <section class="searchable-section join container-fluid d-flex align-items-center bg-primary py-5">
        <div class="container row align-items-center mx-auto px-0 text-center text-md-start text-white">
          <div class="col-md-8">
            <h2 class="head2 text-white">Ready to start learning with us?</h2>
            <p class="lorem text-white">Join thousands of students worldwide who are already mastering no-code skills.</p>
          </div>
          <div class="col-md-4 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
            <button type="button" class="btn1 bg-white text-primary">Get started</button>
          </div>
        </div>
      </section>
    </main>
  `;
}
