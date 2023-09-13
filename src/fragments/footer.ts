import { viteIcon } from '../icons/vite';
import { gitHubIcon } from '../icons/gitHub';
import { typescriptIcon } from '../icons/typescript';
import { linkedinIcon } from '../icons/linkedin';
import reqresIcon from '../icons/reqres.png';

export function renderFooter(container: HTMLDivElement) {
  const footer = document.createElement('footer');
  footer.innerHTML = /*html*/ `
    <div id="tech-stack">
      <p>Built with</p>
      <a href="https://www.typescriptlang.org/">
        ${typescriptIcon}
      </a>
        <a href="https://vitejs.dev/">
          ${viteIcon}
        </a>
        <a href="https://reqres.in/">
          <img src=${reqresIcon} alt="Reqres" title="Reqres">
        </a>
    </div>
    <div id="social-media">
      <p>Connect</p>
      <a href="https://github.com/tmmluis">
        ${gitHubIcon}
      </a>
      <a href="https://www.linkedin.com/in/tmmluis/">
        ${linkedinIcon}
      </a>
    </div>
  `;
  container.append(footer);
}
