import React from 'react'
import Navbar from '../../components/students/Navbar'
import Hero from '../../components/students/Hero'
import CourseSection from '../../components/students/CourseSection'
import Companies from '../../components/students/Companies'
import CallToAction from '../../components/students/CallToAction'
import Testimonial from '../../components/students/Testimonial'
import Footer from '../../components/students/Footer'

const Home = () => {
  return (
    <div className='flex flex-col items-center space-y-7 text-center'>
      <Hero />
      <Companies />
      <CourseSection />
      <Testimonial />
      <CallToAction />
      <Footer />
    </div>
  )
}

export default Home
