import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiUsers, FiTarget, FiZap, FiAward, FiTrendingUp } from 'react-icons/fi';

const AboutContainer = styled.div`
  padding: 120px 0 80px;
  background: #f8fafc;
  min-height: 100vh;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Hero = styled.div`
  text-align: center;
  margin-bottom: 80px;

  h1 {
    font-size: 3rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 24px;

    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
  }

  p {
    font-size: 1.25rem;
    color: #64748b;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
  }
`;

const StorySection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  margin-bottom: 80px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 32px;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    line-height: 1.8;
    margin-bottom: 24px;
  }
`;

const ValuesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
`;

const ValueCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  .icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 32px;
    margin: 0 auto 24px;
  }

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
  }
`;

const TeamSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  margin-bottom: 80px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
    text-align: center;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
`;

const TeamMember = styled(motion.div)`
  text-align: center;

  .avatar {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 2rem;
    font-weight: 700;
    margin: 0 auto 24px;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 8px;
  }

  .role {
    color: #3b82f6;
    font-weight: 600;
    margin-bottom: 16px;
  }

  p {
    color: #64748b;
    line-height: 1.6;
    font-size: 0.9rem;
  }
`;

const StatsSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 20px;
  padding: 80px 60px;
  text-align: center;
  margin-bottom: 80px;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
`;

const StatItem = styled(motion.div)`
  h3 {
    font-size: 3rem;
    font-weight: 800;
    margin-bottom: 8px;
  }

  p {
    font-size: 1.1rem;
    opacity: 0.9;
    margin: 0;
  }
`;

const TestimonialsSection = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  margin-bottom: 80px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    text-align: center;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    text-align: center;
    margin-bottom: 60px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
`;

const TestimonialsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
`;

const TestimonialCard = styled(motion.div)`
  background: #f8fafc;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #e2e8f0;

  .quote {
    font-size: 1.1rem;
    color: #374151;
    line-height: 1.6;
    margin-bottom: 24px;
    font-style: italic;
  }

  .author {
    display: flex;
    align-items: center;
    gap: 16px;

    .avatar {
      width: 50px;
      height: 50px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 700;
      font-size: 1.1rem;
    }

    .info {
      .name {
        font-weight: 600;
        color: #1f2937;
        margin-bottom: 4px;
      }

      .company {
        color: #64748b;
        font-size: 0.9rem;
        margin-bottom: 4px;
      }

      .results {
        color: #10b981;
        font-weight: 600;
        font-size: 0.9rem;
      }
    }
  }
`;

const CTA = styled.div`
  background: white;
  border-radius: 20px;
  padding: 80px 60px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);

  @media (max-width: 768px) {
    padding: 40px 30px;
  }

  h2 {
    font-size: 2.5rem;
    font-weight: 800;
    color: #1f2937;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.1rem;
    color: #64748b;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }

  .button {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    padding: 16px 32px;
    border-radius: 12px;
    font-weight: 600;
    font-size: 1.1rem;
    text-decoration: none;
    transition: all 0.3s;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
    }
  }
`;

const About = () => {
  const values = [
    {
      icon: <FiTarget />,
      title: 'Results-Driven',
      description: 'We focus on delivering measurable results that directly impact your bottom line. Every automation we build is designed to generate real revenue.'
    },
    {
      icon: <FiZap />,
      title: 'Innovation First',
      description: 'We stay at the forefront of automation technology, constantly developing new tools and techniques to give you a competitive edge.'
    },
    {
      icon: <FiUsers />,
      title: 'Customer Success',
      description: 'Your success is our success. We provide comprehensive support and training to ensure you get the most out of our automation tools.'
    },
    {
      icon: <FiAward />,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in everything we do, from code quality to customer service. Excellence is not optional.'
    }
  ];

  const team = [
    {
      name: 'Alex Johnson',
      role: 'Founder & CEO',
      avatar: 'AJ',
      bio: 'Serial entrepreneur with 10+ years in automation and lead generation. Built and sold 3 successful SaaS companies.'
    },
    {
      name: 'Sarah Chen',
      role: 'Head of Engineering',
      avatar: 'SC',
      bio: 'Full-stack developer and automation expert. Previously led engineering teams at Google and Microsoft.'
    },
    {
      name: 'Mike Rodriguez',
      role: 'Head of Sales',
      avatar: 'MR',
      bio: 'Sales strategist with a track record of building high-performing teams. Generated $50M+ in revenue for previous companies.'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success',
      avatar: 'ED',
      bio: 'Customer success specialist with a passion for helping businesses grow. 5+ years experience in B2B automation.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '$50M+', label: 'Revenue Generated' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      quote: "Automation Solutions transformed our lead generation completely. We went from 50 leads per month to over 2,000. The ROI was immediate and the setup was incredibly easy.",
      name: "Sarah Johnson",
      company: "TechStart Inc.",
      avatar: "SJ",
      results: "400% increase in leads"
    },
    {
      quote: "The email automation tools are game-changing. Our open rates increased by 60% and we're closing 3x more deals. The team at Automation Solutions is incredibly supportive.",
      name: "Michael Chen",
      company: "GrowthCo",
      avatar: "MC",
      results: "300% more deals closed"
    },
    {
      quote: "I was skeptical about automation, but Automation Solutions proved me wrong. We've saved 20 hours per week and our revenue has grown by 150%. Best investment we've made.",
      name: "Emily Rodriguez",
      company: "ScaleUp Solutions",
      avatar: "ER",
      results: "150% revenue growth"
    },
    {
      quote: "The custom automation they built for us is incredible. It handles our entire sales process from lead capture to follow-up. We couldn't be happier with the results.",
      name: "David Thompson",
      company: "Enterprise Corp",
      avatar: "DT",
      results: "Fully automated sales process"
    }
  ];

  return (
    <AboutContainer>
      <Container>
        <Hero>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            About Automation Solutions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We're on a mission to democratize business automation and help entrepreneurs 
            build profitable, scalable businesses without technical barriers.
          </motion.p>
        </Hero>

        <StorySection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Story
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Automation Solutions was born from a simple observation: most entrepreneurs have brilliant 
            business ideas but lack the technical skills to automate their processes and 
            scale efficiently. We saw countless businesses struggling with manual tasks 
            that could easily be automated.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Our founder, Alex Johnson, spent years building automation tools for his own 
            businesses and realized that these tools could help thousands of other 
            entrepreneurs. After successfully selling three SaaS companies, he decided 
            to focus on making automation accessible to everyone.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Today, Automation Solutions has helped over 10,000 businesses automate their processes 
            and generate millions in additional revenue. We're not just a software company 
            – we're your partners in building a successful, automated business.
          </motion.p>
        </StorySection>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 800, color: '#1f2937', marginBottom: '60px' }}>
            Our Values
          </h2>
          <ValuesGrid>
            {values.map((value, index) => (
              <ValueCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </ValueCard>
            ))}
          </ValuesGrid>
        </motion.div>

        <TeamSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We're a team of passionate entrepreneurs, engineers, and business experts 
            who believe in the power of automation to transform businesses.
          </motion.p>
          <TeamGrid>
            {team.map((member, index) => (
              <TeamMember
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="avatar">{member.avatar}</div>
                <h3>{member.name}</h3>
                <div className="role">{member.role}</div>
                <p>{member.bio}</p>
              </TeamMember>
            ))}
          </TeamGrid>
        </TeamSection>

        <StatsSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Impact
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            The numbers speak for themselves. Here's what we've accomplished together.
          </motion.p>
          <StatsGrid>
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatItem>
            ))}
          </StatsGrid>
        </StatsSection>

        <TestimonialsSection>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Don't just take our word for it. Here's what real customers are saying about their results.
          </motion.p>
          <TestimonialsGrid>
            {testimonials.map((testimonial, index) => (
              <TestimonialCard
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="quote">"{testimonial.quote}"</div>
                <div className="author">
                  <div className="avatar">{testimonial.avatar}</div>
                  <div className="info">
                    <div className="name">{testimonial.name}</div>
                    <div className="company">{testimonial.company}</div>
                    <div className="results">{testimonial.results}</div>
                  </div>
                </div>
              </TestimonialCard>
            ))}
          </TestimonialsGrid>
        </TestimonialsSection>

        <CTA>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to Join Our Success Story?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Join thousands of entrepreneurs who are already using our automation tools 
            to build profitable, scalable businesses.
          </motion.p>
          <motion.a
            href="/pricing"
            className="button"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <FiTrendingUp />
            Start Your Journey
          </motion.a>
        </CTA>
      </Container>
    </AboutContainer>
  );
};

export default About;
