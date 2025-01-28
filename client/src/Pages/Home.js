import React from "react";
import {Link} from "react-router-dom";
const Home=()=>{
    return (
        <>
        <main class="my-5">
            <div class="container shadow-lg">
                <section class="text-center">
                    <h2 class="mb-5 my-3">
                        <strong>Latest posts</strong>
                    </h2>
                    <div class="row">
                        <div class="col-lg-4 col-md-12 mb-4">
                            <div class="card">
                                <div 
                                class="bg-image hover=overlay ripple"
                                data-mdb-ripple-color="light"
                                >
                                    <img
                                    src={`https://www.kindpng.com/picc/m/235-2350682_new-svg-image-small-user-login-icon-hd.png`}
                                    class="img-fluid"
                                    />
                                    <a href="#!" >
                                        <div 
                                        class="mask"
                                        style={{
                                            backgroundColor: "rgba(251,251,0.15)",
                                        }}
                                        ></div>
                                    </a>
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">Demo</h5>
                                    <p class="card-text">Demo Content</p>
                                    <Link to={'/blog/1'} class="btn btn-primary">
                                    Read More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
        <footer class="bg-primary text-lg-start">
            <div 
            class="text-center p-3 text-white"
            style={{backgroundColor: "rgba(0,0,0,0.2"}}
            >
                0 2022 Cpyright:
                <a class="text-white mx-2" href="https://mdbootstrap.com/">
                Blog App
                </a>
            </div>
        </footer>
        </>
    );
};

export default Home;