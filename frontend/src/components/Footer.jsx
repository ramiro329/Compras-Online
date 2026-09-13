import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section footer-info">
          <h2>Compra Online</h2>
          <p>
            Encontrá todo lo que necesitás de manera rápida,
            fácil y segura.
          </p>
        </div>

        

        <div className="footer-section">
          <h3>Seguinos</h3>

          <div className="footer-socials">

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              Instagram
            </a>

            <a
              href="https://x.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              X
            </a>

            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              TikTok
            </a>

          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © 2026 Compra Online. Todos los derechos reservados.
        </p>
      </div>

    </footer>
  )
}

export default Footer






