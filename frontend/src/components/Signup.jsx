import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom' // Add this import
import '../css/signup.css'
import { Coffee, Eye, EyeOff, Star, Gift, Clock } from 'lucide-react'

const Signup = () => {
  const navigate = useNavigate() // Add this hook
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    agreeToTerms: false,
    subscribeToOffers: true
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.password.trim() ||
      !formData.confirmPassword.trim()) {
    alert("Please fill in all required fields.");
    return;
  }

  if (formData.password !== formData.confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('coffeno_user', JSON.stringify(data.user));
      localStorage.setItem('coffeno_token', data.token);
      navigate('/');
    } else {
      alert(data.error || 'Signup failed');
    }
  } catch (error) {
    alert("Server error. Please try again later.");
  }
};



  // Add this function to handle navigation to login
  const handleSignInClick = () => {
    navigate('/login') // Adjust the path according to your routing setup
  }

  return (
    <div className='container'>
      {/* Header */}
      <header className='header'>
        <div className='headerContent'>
          <div className='headerFlex'>
            <div className='logo'>
              <img src='../Coffeno.jpeg' alt="Coffeno Logo" />
              <h1 className='logoText'>Coffeno</h1>
            </div>
            
          </div>
        </div>
      </header>

      <div className='mainContainer'>
        <div className='maxWidth'>
          <div className='gridWrapper'>
            {/* Benefits Section */}
            <div className='benefitsCard'>
              <div className='benefitsHeader'>
                <Coffee size={64} color="#d97706" className='benefitsIcon' />
                <h2 className='benefitsTitle'>Join Our Coffee Community</h2>
                <p className='benefitsSubtitle'>Start earning rewards with your first order!</p>
              </div>

              <div className='benefitsList'>
                <div className='benefitItem'>
                  <div className='benefitIcon'>
                    <Star size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className='benefitTitle'>Earn Rewards Points</h3>
                    <p className='benefitText'>Get 1 point for every $1 spent. Redeem for free drinks and food!</p>
                  </div>
                </div>

                <div className='benefitItem'>
                  <div className='benefitIcon'>
                    <Gift size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className='benefitTitle'>Birthday Treats</h3>
                    <p className='benefitText'>Enjoy a free drink on your birthday and special member-only offers.</p>
                  </div>
                </div>

                <div className='benefitItem'>
                  <div className='benefitIcon'>
                    <Clock size={24} color="#d97706" />
                  </div>
                  <div>
                    <h3 className='benefitTitle'>Skip the Line</h3>
                    <p className='benefitText'>Order ahead through our app and pick up without waiting.</p>
                  </div>
                </div>
              </div>

              <div className='welcomeOffer'>
                <p className='welcomeText'>
                  🎉 Sign up today and get a FREE welcome drink!
                </p>
              </div>
            </div>

            {/* Signup Form */}
            <div className='formCard'>
              <div className='formHeader'>
                <h2 className='formTitle'>Create Your Account</h2>
                <p className='formSubtitle'>Join thousands of coffee lovers</p>
              </div>

              <div className='formContent'>
                <div className='nameGrid'>
                  <div className='inputGroup'>
                    <label className='label'>First Name</label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className='input'
                      placeholder='Enter your first name'
                      required
                    />
                  </div>
                  <div className='inputGroup'>
                    <label className='label'>Last Name</label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className='input'
                      placeholder='Enter your last name'
                      required
                    />
                  </div>
                </div>

                <div className='inputGroup'>
                  <label className='label'>Email Address</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='input'
                    placeholder='Enter your email'
                    required
                  />
                </div>

                <div className='inputGroup'>
                  <label className='label'>Phone Number</label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    className='input'
                    placeholder='Enter your phone number'
                  />
                </div>

                <div className='inputGroup'>
                  <label className='label'>Birthday (Optional)</label>
                  <input
                    type='date'
                    name='birthday'
                    value={formData.birthday}
                    onChange={handleInputChange}
                    className='input'
                  />
                  <p className='helpText'>We'll send you a special birthday treat!</p>
                </div>

                <div className='inputGroup'>
                  <label className='label'>Password</label>
                  <div className='passwordContainer'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name='password'
                      value={formData.password}
                      onChange={handleInputChange}
                      className='passwordInput'
                      placeholder='Create a password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='eyeButton'
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className='inputGroup'>
                  <label className='label'>Confirm Password</label>
                  <div className='passwordContainer'>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className='passwordInput'
                      placeholder='Confirm your password'
                      required
                    />
                    <button
                      type='button'
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className='eyeButton'
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className='checkboxContainer'>
                  <div className='checkboxItem'>
                    <input
                      type='checkbox'
                      name='agreeToTerms'
                      checked={formData.agreeToTerms}
                      onChange={handleInputChange}
                      className='checkbox'
                      required
                    />
                    <label className='checkboxLabel'>
                      I agree to the <a href='#' className='link'>Terms of Service</a> and <a href='#' className='link'>Privacy Policy</a>
                    </label>
                  </div>

                  <div className='checkboxItem'>
                    <input
                      type='checkbox'
                      name='subscribeToOffers'
                      checked={formData.subscribeToOffers}
                      onChange={handleInputChange}
                      className='checkbox'
                    />
                    <label className='checkboxLabel'>
                      Send me special offers, promotions, and news about new products
                    </label>
                  </div>
                </div>

                <button
                  type='button'
                  onClick={handleSubmit}
                  className='submitButton hoverDarkenOrange'
                >
                  Create Account & Get Free Drink
                </button>
               <div className='centerSignIn'>
              <span className='headerText'>Already have an account?</span>
              <button 
                className='signInButton hoverTextOrange'
                onClick={handleSignInClick}
              >
                Sign In
              </button>
            </div>
                <div className='divider'>
                  <div className='dividerLine'>
                    <div className='dividerBorder'></div>
                  </div>
                  <div className='dividerText'>
                    <span>Or sign up with</span>
                  </div>
                </div>

                <div className='socialGrid'>
                  <button type='button' className='socialButton hoverYellow'>
                    <svg className='socialIcon' viewBox='0 0 24 24'>
                      <path fill='#4285F4' d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'/>
                      <path fill='#34A853' d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'/>
                      <path fill='#FBBC05' d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'/>
                      <path fill='#EA4335' d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'/>
                    </svg>
                    Google
                  </button>
                  <button type='button' className='socialButton hoverYellow'>
                    <svg className='socialIcon' fill='#1877F2' viewBox='0 0 24 24'>
                      <path d='M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z'/>
                    </svg>
                    Facebook
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup