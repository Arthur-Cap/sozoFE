import React from 'react';
import "./authTitle.css";

interface AuthTitleProps {
  welcomeString: string;
  titleString: string;
  redirectString: string;
  linkString: string;
}

const AuthTitle: React.FC<AuthTitleProps> = ({ welcomeString, titleString, redirectString, linkString }) => {
  return ( 
    <div className="auth-title-containner">
      <h4 className='greet-title'><strong>{welcomeString}</strong></h4>
      <div className='auth-title'>{titleString}  <a style={{ color: '#00ff38', fontSize: '50px', position: 'relative', left: '7px', animation: 'fadeBlink 1s ease-in-out infinite' }}> . </a></div>
      <p className='redirect-title' >
        {redirectString} <a className='auth-redirect' href={linkString}>Click here</a>
      </p>
    </div>
  );
};

export default AuthTitle;
