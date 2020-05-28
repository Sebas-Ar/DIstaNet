import React from 'react'

const Footer = () => {
    return (
        <footer>
            <div className="text">
                <p>Juan Sebastian Arias Duarte</p>
            </div>
            <a
                href="https://www.usta.edu.co/"
                target="_blank"
                rel="noopener noreferrer"
            >
                Universidad Santo Tomás <img src="/img/usta.png" alt="ZEIT Logo" />
            </a> <br />

            <style jsx>{`
                
                footer {
                    width: 100%;
                    height: 100px;
                    border-top: 1px solid #eaeaea;
                    display: grid;
                    justify-items: center;
                    background: rgba(75, 192, 192, 0.8);
                    padding: 10px 0 0 0 ;
                }


                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                img {
                width: 30px; 
                }

                a {
                    text-decoration: none;
                    color: white;
                }

                footer img {
                    margin-left: 0.5rem;
                }

                footer a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                p {
                    align-self: center;
                    text-align: center;
                    width: 250px;
                    color: white;
                }

                .text {
                    display: grid;
                    grid-template-columns: 1fr;
                    width: 800px;
                    display: gird;
                    align-items: center;
                    justify-items: center;
                }

                .linea {
                    width: 2px;
                    height: 15px;
                    background-color: white;
                }
            
            `}</style>
        </footer>
    )
}

export default Footer
