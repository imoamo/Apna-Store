import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import styled from 'styled-components';

const Contact = () => {
  const { isAuthenticated, user } = useAuth0();
  return <Wrapper>
    <h2 className='common-heading'>Contact page</h2>

    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.60024856207!2d77.1017848811061!3d28.64174072092205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d0363c4edf747%3A0x240c75aa3d09de7a!2sPacific%20Mall%20Tagore%20Garden!5e0!3m2!1sen!2sin!4v1709819830583!5m2!1sen!2sin"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade">

    </iframe>

    <div className="container">
      <div className="contact-form">

        <form
          action="https://formspree.io/f/xjvnoygd"
          method='POST' className='contact-inputs'>
          <input
            type="text"
            value={isAuthenticated ? user.name : ''}
            placeholder='username'
            name='username'
            required
            autoComplete='off'

          />

          <input
            type='email'
            name='Email'
            value={isAuthenticated ? user.email : ''}
            placeholder='Email'
            autoComplete='off'
            required

          />

          <textarea
            placeholder='Enter your message'
            name='Message'
            cols='30'
            rows='10'
            required
            autoComplete='off'
          >

          </textarea>

          <input type='submit' value='send' />
        </form>
      </div>
    </div>

  </Wrapper>
};

const Wrapper = styled.section`
padding: 9rem 0 5rem 0;
text-align: center;

.container {
  margin-top: 6rem;

  .contact-form {
    max-width: 50rem;
    margin: auto;

    .contact-inputs {
      display: flex;
      flex-direction: column;
      gap: 3rem;

      input[type="submit"] {
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
          background-color: ${({ theme }) => theme.colors.white};
          border: 1px solid ${({ theme }) => theme.colors.btn};
          color: ${({ theme }) => theme.colors.btn};
          transform: scale(0.9);
        }
      }
    }
  }
}
`;

export default Contact;