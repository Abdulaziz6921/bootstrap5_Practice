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
            <div class="container row mx-auto align-items-center justify-content-between"
                style="padding: 100px 0 50px 0;">
                <div class="col-md-5 fade-slide-up">
                    <h1 class="head1 fw-bold">Learnico is a multidisciplinary education platform</h1>
                </div>
                <div class="col-md-6 fade-slide-up">
                    <p class="lorem">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum
                        tristique.
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

            <div class="box container row mx-auto d-flex justify-content-between align-items-center mb-0">
                <div class="card bg-warning text-primary col-md-4 p-4" style="height: fit-content;">
                    <div class="about-values-icon">
                        <i class="bi bi-suit-heart-fill"></i>
                    </div>
                    <h2>Culture</h2>
                    <p class="fw-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique duis cursus
                        mi quis viverra.
                    </p>
                </div>
                <div class="card bg-warning text-primary col-md-4 p-4" style="height: fit-content;">
                    <div class="about-values-icon">
                        <i class="bi bi-emoji-smile-fill"></i>
                    </div>
                    <h2>Community</h2>
                    <p class="fw-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique duis cursus
                        mi quis viverra.
                    </p>
                </div>

                <div class="card bg-warning text-primary col-md-4 p-4" style="height: fit-content;">
                    <div class="about-values-icon">
                        <i class="bi bi-people-fill"></i>
                    </div>
                    <h2>Teamwork</h2>
                    <p class="fw-normal">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros
                        elementum tristique duis cursus
                        mi quis viverra.
                    </p>
                </div>

            </div>
        </section>

        <!-- Our Teachers -->
        <section class="searchable-section trending blog container-fluid py-md-5 bg-white">
            <div class="container d-flex flex-column">
                <button class="section_btn bg-warning text-center">Teachers</button>

                <h2 class="head2 fw-bold py-3">Our teachers</h2>

                <p class="lorem p-0 text-start">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>

            <div class="box mb-0 container mx-auto px-0 d-flex row justify-content-around gy-md-5 gy-2  pt-md-5 pt-3">
                <!-- Teacher 1 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Noah.jpg" alt="Teacher Noah" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Noah Pierre </p>
                            <p class="fw-normal">Webflow Expert</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>

                    </div>


                </div>

                <!-- Teacher 2 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Ava.jpg" alt="Teacher Ava" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Ava Wright</p>
                            <p class="fw-normal">UI/UX Design</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>
                    </div>
                </div>

                <!-- Teacher 3 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Josh.jpg" alt="Teacher Josh" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Josh Knight</p>
                            <p class="fw-normal">Webflow Expert</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>
                    </div>
                </div>

                <!-- Teacher 4 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Koray.jpg" alt="Teacher Koray" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Koray Okumus</p>
                            <p class="fw-normal">Design System Specialist</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>
                    </div>
                </div>

                <!-- Teacher 5 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Kelly.jpg" alt="Teacher Kelly" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Kelly Williams</p>
                            <p class="fw-normal">Webflow Expert</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>
                    </div>
                </div>

                <!-- Teacher 6 -->
                <div class="card bg-primary text-white px-0 rounded-4 fade-slide-up">
                    <img src="./images/Alisa.jpg" alt="Teacher Alisa" class="card-img-top">
                    <div class="card-body">
                        <div class="card-title fs-5">
                            <p class="mb-0">Alisa Hester</p>
                            <p class="fw-normal">UI/UX Design</p>
                        </div>

                        <p class="card-text fw-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Suspendisse varius
                            enim in eros elementum tristique.</p>
                    </div>

                    <div class="card_footer mt-2 mb-4 ms-3 d-flex align-items-center gap-2">
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-linkedin fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-twitter fs-5"></i>
                        </div>
                        <div
                            class="d-flex justify-content-center align-items-center bg-secondary pt-1 pb-1 ps-2 pe-2 rounded-1">
                            <i class="bi bi-dribbble fs-5"></i>
                        </div>
                    </div>
                </div>




            </div>
        </section>

        <!-- Join newspaper -->
        <section class="searchable-section about testimonials py-5">
            <div class="container bg-warning py-5 rounded-4">
                <div class="row align-items-center py-5 px-5">

                    <!-- CTA Content -->
                    <div class="col-lg-6 mb-4 mb-lg-0">
                        <h3 class="mb-2">Join our newsletter</h3>
                        <p class="text-muted fs-5">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </div>

                    <!-- CTA Form -->
                    <div class="col-lg-6 ">
                        <form class="cta-form d-flex flex-column flex-sm-row gap-3 me-lg-5 pe-lg-5">
                            <input type="email" class="form-control" placeholder="Enter your email" required>
                            <button type="submit" class="btn1 bg-primary flex-shrink-0">
                                Sign Up
                            </button>
                        </form>
                        <small class="text-muted d-block mt-2 ">
                            By clicking Sign Up you're confirming that you agree with our
                            <a href="#" class="text-decoration-underline text-muted">Terms and Conditions</a>.
                        </small>
                    </div>

                </div>
            </div>
        </section>
    </main>
  `;
}
