/* eslint-disable jsx-a11y/heading-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useState} from 'react';
import Layout from '../components/Layout';
import axios from 'axios'
import { message, Form, Input, Select, Rate, Typography} from 'antd';
import { StarFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { showLoading, hideLoading } from '../redux/features/alertSlice';
import { useNavigate } from 'react-router-dom';
import Images from '../constants/Image';
import DoctorList from '../components/DoctorList';

const { Option } = Select;

const Homepage = () => {
  
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  const totalSlides = 3;

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 5000); // Change the interval duration as needed (here, it advances every 5 seconds)

    return () => clearInterval(intervalId); // Cleanup function to clear the interval on component unmount
  }, [currentSlide]); // Include currentSlide in the dependency array to avoid potential issues


  const [doctors, setDoctors] = useState([])
  //login user data
  const getUserData = async() => {
    try {
      const res = await axios.get('/api/v1/user/getAllDoctors', {
        headers: {
          Authorization : "Bearer " + localStorage.getItem('token'),
        },
      })
      if (res.data.success) {
        setDoctors(res.data.data)
        console.log('Doctors data retrieved successfully:', res.data.data);
      }
    } catch (error) {
      console.log(error)
      
    }
  }

  const handleSubmit = async (values) => {
      try {
          dispatch(showLoading());
          const res = await axios.post('/api/v1/user/create-feedback', {
              ...values,
              userId: user._id,
          }, {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
              }
          });
          dispatch(hideLoading());

          if (res.data.success) {
              message.success(res.data.message);
              navigate('/user/feedbacks');
          } else {
              message.error(res.data.message);
          }
      } catch (error) {
          dispatch(hideLoading());
          console.error(error);
          message.error('Something went wrong');
      }
  };

  useEffect(() => {
    getUserData()
  }, [])
  
  const testimonialsData = [
    {
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      name: "Luisa Marie",
    },

    {
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      name: "Divine Grace",
    },
     {
      text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit...",
      name: "Jericho",
    },
  ];


  return (
    <Layout>

  <header className="container-fluid">
      <div className="row">
        <div className="col-md-12 position-relative p-0">
          <button className="btn btn-secondary position-absolute start-0 top-50 ml-5 translate-middle-y" onClick={prevSlide}>
            <i className="fa-solid fa-angles-left"></i>
          </button>
          <button className="btn btn-secondary position-absolute end-0 top-50 mr-5 translate-middle-y" onClick={nextSlide}>
            <i className="fa-solid fa-angles-right"></i>
          </button>
          <img
            id="dog"
            className="w-100 mb-1 m-0 p-0"
            src={
              currentSlide === 0
                ? Images.carousel1
                : currentSlide === 1
                ? Images.carousel2
                : Images.carousel3
            }
            alt="name"
          />
          <div className="carousel-caption text-center align-items-center justify-content-center position-absolute top-50 start-50 translate-middle">
            {/* Your existing content */}
            <h4 className="text-white mb-1 mt-20 font-bold text-4xl d-sm-block">Best Pet Services</h4>
            <h1 className="font-bold d-sm-block text-4xl text-white mb-2">Keep Your Pet Happy</h1>
            <h3 className="text-white d-sm-block">Duo nonumy et dolor tempor no et. Diam sit diam sit diam erat</h3>
            {doctors && doctors.map((doctor) => <DoctorList key={doctor._id} doctor={doctor} />)}
          </div>
        </div>
      </div>
    </header>


    {/* <!-- Start About Us --> */} 
        <div class="container5">
        <div class="row py-5">
            <div class="col-lg-7 pb-lg-0 px-3 px-lg-5">
                <h2 class=" mb-2 text-2xl font-bold text-5xl">About Us</h2>
                <h1 class="display-4 mb-4 font-bold"><span class="text-primary">Boarding</span> & <span class="text-warning">Daycare</span></h1>
                <p class="mb-2">A veterinary facility committed to offering comprehensive healthcare services for pets, 
              providing medical treatments, preventive care, and personalized attention in a caring environment. 
              The clinic's goal is to ensure the well-being and happiness of animals through professional veterinary services.</p>
                <ul class="list-inline">
                    <li><h5 className='font-bold'><i class="fa fa-check-double text-secondary mr-3 text-lg"></i>Best In Industry</h5></li>
                    <li><h5 className='font-bold'><i class="fa fa-check-double text-secondary mr-3 text-lg"></i>Emergency Services</h5></li>
                    <li><h5 className='font-bold'><i class="fa fa-check-double text-secondary mr-3 text-lg"></i>24/7 Customer Support</h5></li>
                </ul>
                <button href="" class="btn btn-md w-32 btn-primary mt-3 px-2">Learn More</button>
            </div>
            <div class="col-lg-5">
                <div class="row px-2">
                    <div class="col-12 p-0">
                        <img class="img-fluid w-100" src={Images.about1} alt=""/>
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src={Images.about2} alt=""/>
                    </div>
                    <div class="col-6 p-0">
                        <img class="img-fluid w-100" src={Images.about3} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* <!-- Start  --> */}

    {/* <!-- Start Service --> */}
      <div  style={{ backgroundColor: '#E8F4FE'}}>    
      <div class="container-fluid p-0 m-0">
        <div class="px-5 p-0">
          <div class="d-flex flex-column text-center mb-5">
            <h4 class="text-secondary mb-3 mt-4 text-5xl font-bold">Our Services</h4>
            <h1 class="display-4 m-0 font-bold"><span class="text-primary">Premium</span> Pet Services</h1>
          </div>

          <div class="row pb-3">
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa fa-dumbbell display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Medication</h3>
                <p>Medication refers to the administration of drugs or Veterinarians substances to treat, alleviate, or prevent diseases, symptoms, or conditions in animals. 
                  Veterinarians may prescribe medications such as antibiotics, pain relievers, or anti-inflammatory drugs.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa fa-paw display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Vaccination</h3>
                <p>Vaccination involves the administration of vaccines to animals to stimulate their immune systems and provide protection against specific infectious diseases.
                  Vaccinations are crucial for preventing the spread of diseases and maintaining the overall health of the animal population.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa-solid fa-syringe display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Check Up</h3>
                <p>A check-up, also known as routine examination, is a thorough physical examination of an animal conducted by a veterinarian. 
                  It is performed to assess the overall health of the animal, detect any potential issues early on, and discuss preventive care measures with the pet owner.</p>
              </div>
            </div>
          </div>

          <div class="row pb-3">
            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa fa-dumbbell display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Deworming</h3>
                <p>Deworming is the giving of an anthelmintic drug (a wormer, dewormer, or drench)
                   to a human or animals to rid them of helminths parasites, such as roundworm, flukes and tapeworm. Regular deworming is an essential preventive measure to ensure the health of pets and prevent the spread of parasites.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa fa-paw display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Lab Test</h3>
                <p>Lab tests involve the analysis of samples, such as blood, urine, or tissue, in a laboratory setting. 
                  In veterinary medicine, lab tests are conducted to diagnose diseases, assess organ function, and monitor overall health. 
                  Common veterinary lab tests include blood tests, urinalysis, and imaging studies.</p>
              </div>
            </div>

            <div class="col-md-6 col-lg-4 mb-4">
              <div class="service-card d-flex flex-column text-center bg-gray-300 rounded-lg mb-2 p-3 p-sm-5">
                <h3 class="fa-solid fa-syringe display-3 font-weight-normal text-secondary mb-3"></h3>
                <h3 class="mb-3">Surgery</h3>
                <p>Surgery in the veterinary context involves the use of operative procedures to treat or correct various medical conditions in animals.
                  Veterinary surgeries can range from routine procedures such as spaying or neutering to more complex surgeries, including tumor removal, orthopedic procedures, and dental surgeries.</p>
              </div>
            </div>
          </div>

          
        </div>
      </div>
      </div> 

    {/* <!-- Services End --> */}
      
    {/* <!-- Features Start --> */}
    <div class="container6">
        <div class="row align-items-center">
            <div class="col-lg-5">
                <img class="img-fluid w-100" src={Images.feature} alt=""/>
            </div>
            <div class="col-lg-7 py-lg-0 px-2 px-lg-3">
                <h4 class="text-secondary mb-3 text-5xl font-bold">Why Choose Us?</h4>
                <h1 class="display-4 mb-4 font-bold"><span class="text-primary">Special Care</span> On Pets</h1>
                <p class="mb-4">Dolor lorem lorem ipsum sit et ipsum. Sadip sea amet diam sed ut vero no sit. Et elitr stet sed sit sed kasd. Erat duo eos et erat sed diam duo</p>
                <div class="row py-2">
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-4">
                           
                            <h5 class="text-truncate m-0 font-bold">Best In Industry</h5>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center mb-4">
                            
                            <h5 class="text-truncate m-0 font-bold">Emergency Services</h5>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center">
                            
                            <h5 class="text-truncate m-0 font-bold">Special Care</h5>
                        </div>
                    </div>
                    <div class="col-6">
                        <div class="d-flex align-items-center">
                            
                            <h5 class="text-truncate m-0 font-bold mb-2">Customer Support</h5>
                        </div>
                    </div>
                </div>
            </div>
        </div>  
    </div>

    {/* <!-- Features End -->         */}


    {/* <!-- Feedback Start --> */}

    <section  style={{ backgroundColor: '#E8F4FE'}}>
        <div className=" px-6 py-10 mx-auto">
        <Typography.Title level={1} className="text-center capitalize mt-5 text-primary mb-3">
            What our clients say
          </Typography.Title>

          <Typography.Paragraph className="mx-auto mt-6 text-center text-gray-500 dark:text-gray-300 text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo incidunt
            ex placeat modi magni quia error alias, adipisci rem similique, at
            omnis eligendi optio eos harum.
          </Typography.Paragraph>

          <section className="grid grid-cols-3 gap-3 mt-8">
            {testimonialsData.map((testimonial, index) => (
              <div key={index} className="testimonial-card p-8 border rounded-lg bg-white">
                  <Typography.Paragraph className="leading-loose text-gray-500 dark:text-gray-400">
                    {testimonial.text}
                  </Typography.Paragraph>
                  <div className="flex items-center mt-8">
                    <div className="mx-2">
                      <Typography.Title level={4} className="font-semibold text-gray-800 dark:text-white">
                        {testimonial.name}
                      </Typography.Title>
                      <Rate allowHalf defaultValue={5} disabled />
                    </div>
                  </div>
                </div>
              ))}
            </section>
        </div>
     
        
        <h2 className='text-center text-4xl font-bold mt-2'><span class='text-secondary'>Send us</span> <span class='text-warning'>Feedback</span></h2>
        <p className="mt-3 mb-4 text-center text-2xl text-black">
          Your feedback shapes our care!
          Share thoughts on check-ups, meds, vaccinations. <br />
          Help us enhance your vet services!
        </p>
        <div className='flex justify-center'>
      <div className='flex w-full max-w-2xl p-5 mx-auto mb-5 rounded-2xl form-container' style={{ backgroundColor: '#fff', }}>
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="w-full feedback-form">
          <Form.Item label="Category" name="category" required rules={[{ required: true }]} className="form-item">
            <Select placeholder="Select a category">
              <Option value="Vaccination">Vaccination</Option>
              <Option value="Medication">Medication</Option>
              <Option value="Check-up">Check-up</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Feedback" name="feedback" required rules={[{ required: true }]} className="form-item">
            <Input.TextArea rows={4} placeholder="Enter your feedback here" />
          </Form.Item>

          <Form.Item
            label="Ratings"
            name="ratings"
            required
            rules={[
              { required: true, message: 'Please enter ratings' },
              {
                validator: async (_, value) => {
                  if (value >= 1 && value <= 5) {
                    return Promise.resolve();
                  }
                  return Promise.reject('Ratings must be between 1 and 5');
                },
              },
            ]}
            className="form-item">
            <Rate
              allowHalf
              defaultValue={0}
              character={<StarFilled style={{ backgroundcolor: 'white' }} />}
            />
          </Form.Item>

          <div className='flex justify-center'>
            <button style={{ backgroundColor: '#4a1e8a', color: '#fff' }} className='py-2 form-btn rounded-lg' type="submit">
              Submit Feedback 
            </button>
          </div>
        </Form>
      </div>
    </div>
      </section>
{/* <!-- Feedback End --> */}



<footer class="footer-distributed">

			<div class="footer-left">

				<h3>Company<span>logo</span></h3>

				<p class="footer-links">
					<a href="#" class="link-1">Home</a>
					
					<a href="#">Blog</a>
				
					<a href="#">Pricing</a>
				
					<a href="#">About</a>
					
					<a href="#">Faq</a>
					
					<a href="#">Contact</a>
				</p>

				<p class="footer-company-name">Your Vets Animal Clinic © 2023</p>
			</div>

			<div class="footer-center">

				<div>
					<i class="fa fa-map-marker"></i>
					<p><span>2009 Gerardo Tuazon St, Sampaloc, Manila,</span> 1008 Metro Manila</p>
				</div>

				<div>
					<i class="fa fa-phone"></i>
					<p>+1.555.555.5555</p>
				</div>

				<div>
					<i class="fa fa-envelope"></i>
					<p><a href="mailto:support@company.com">support@company.com</a></p>
				</div>

			</div>

			<div class="footer-right">

				<p class="footer-company-about">
					<span>About the company</span>
					A veterinary facility committed to offering comprehensive healthcare services for pets, providing medical treatments, preventive care,
           and personalized attention in a caring environment. The clinic's goal is to ensure the well-being and happiness of animals through professional veterinary services.
				</p>

				<div class="footer-icons">

					<a href="#"><i class="fa-brands fa-facebook"></i></a>
					<a href="#"><i class="fa-brands fa-viber"></i></a>
					<a href="#"><i class="fa-brands fa-linkedin"></i></a>
					<a href="#"><i class="fa-brands fa-github"></i></a>

				</div>

			</div>

		</footer>
      
      <div className='d-flex justify-content-end'>
        <a href="#" class="btn btn-lg btn-secondary back-to-top"><i class="fa fa-angle-double-up"></i></a>
      </div> 

    </Layout>
    
  );
};

export default Homepage;