import React from 'react';


const LodgingDetail = () => {
  return (
    <div>
      <header>
        <title>Lodging Detail 임당! </title>
      </header>
      <div>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
      </div>

      <body>

        <div className='main-wrapper'>
          <div className='container'>
            <div className='lodging-div'>
              <div className='lodging-div-left'>
                <div className='img-container'>
                  <img src='/images/lodging01.png' alt='Loding01' />
                </div>
                <div className='hover-container'>
                  <div>
                    <img src='./../images/lodging01.png' alt='Loding01' />'
                  </div>
                  <div>
                    <img src='./../images/lodging02.png' alt='Loding02' />'
                  </div>
                  <div>
                    <img src='./../images/lodging03.png' alt='Loding03' />'
                  </div>
                  <div>
                    <img src='./../images/lodging04.png' alt='Loding04' />'
                  </div>
                  <div>
                    <img src='./../images/lodging05.png' alt='Loding05' />'
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};

export default LodgingDetail;

