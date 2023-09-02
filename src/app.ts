import './style.css';
import { renderHeader } from './fragments/header';
import { renderMain } from './fragments/main';
import { renderFooter } from './fragments/footer';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = renderApp();

function renderApp() {
  return renderHeader().concat(renderMain(), renderFooter());
}
