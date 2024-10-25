import React, {useState} from 'react';
import './../../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import uploadImage from './../../assets/img/features-1.png'; 
import Navbar from './Navbar';

const UploadImage = () => {
  const [fileName, setFileName] = useState('');

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name in the state
        }
    };
  return (
    <>
    <Navbar />
   
    <section id="feature-details hero " className="feature-details section hero " >
      <div className="container">
        
        <div className="row gy-4 align-items-center features-item">
          <div className="col-md-5 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="100">
            <img src={uploadImage} className="img-fluid" alt="Feature 1" />
          </div>
          <div className="col-lg-6 d-flex flex-column justify-content-center text-center text-md-start" data-aos="fade-in">
            <h2>App Uploading page </h2>
            <p>Upload your PDF file here</p>

            <div className="d-flex mt-4 justify-content-center justify-content-md-start">
            <label htmlFor="file-upload" className="download-btn">
                <i className="bi bi-upload"></i> <span>Choose File</span>
            </label>
            <input
                id="file-upload"
                type="file"
                style={{ display: 'none' }} // Hide the default file input
                onChange={handleFileChange}
            />
              <div >
            <input
                type="text"
                value={fileName}
                readOnly // Make it read-only
                placeholder="No file chosen"
                className="form-control ms-3" // Add a margin start for spacing
            /></div>
         
           
        </div>
          </div>
        </div>

        {/* <div className="row gy-4 align-items-center features-item">
          <div className="col-md-5 order-1 order-md-2 d-flex align-items-center" data-aos="zoom-out" data-aos-delay="200">
            <img src="assets/img/features-2.png" className="img-fluid" alt="Feature 2" />
          </div>
          <div className="col-md-7 order-2 order-md-1" data-aos="fade-up" data-aos-delay="200">
            <h3>Corporis temporibus maiores provident</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>

        <div className="row gy-4 align-items-center features-item">
          <div className="col-md-5 d-flex align-items-center" data-aos="zoom-out">
            <img src="assets/img/features-3.png" className="img-fluid" alt="Feature 3" />
          </div>
          <div className="col-md-7" data-aos="fade-up">
            <h3>Sunt consequatur ad ut est nulla consectetur reiciendis animi voluptas</h3>
            <p>
              Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia minima quod. Sunt saepe odit aut quia voluptatem hic voluptas dolor doloremque.
            </p>
            <ul>
              <li><i className="bi bi-check"></i> <span>Ullamco laboris nisi ut aliquip ex ea commodo consequat.</span></li>
              <li><i className="bi bi-check"></i><span> Duis aute irure dolor in reprehenderit in voluptate velit.</span></li>
              <li><i className="bi bi-check"></i> <span>Facilis ut et voluptatem aperiam. Autem soluta ad fugiat.</span></li>
            </ul>
          </div>
        </div>

        <div className="row gy-4 align-items-center features-item">
          <div className="col-md-5 order-1 order-md-2 d-flex align-items-center" data-aos="zoom-out">
            <img src="assets/img/features-4.png" className="img-fluid" alt="Feature 4" />
          </div>
          <div className="col-md-7 order-2 order-md-1" data-aos="fade-up">
            <h3>Quas et necessitatibus eaque impedit ipsum animi consequatur incidunt in</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
            <p>
              Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
              velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
              culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div> */}

      </div>
    </section>
    </>
  );
};

export default UploadImage;
