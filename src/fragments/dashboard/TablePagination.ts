(() => {
  class TablePagination extends HTMLElement {
    constructor() {
      super();

      this.handlePageClick = this.handlePageClick.bind(this);
    }

    connectedCallback() {
      this.render();
    }

    render() {
      this.innerHTML = /*html*/ `
        <nav>
          <ul>
            ${[...Array(this.totalPages).keys()]
              .map((page) => {
                const isActive = page + 1 === this.currentPage;
                return /*html*/ `
                  <li ${isActive ? 'class="active"' : ''}>
                    <a page="${page + 1}" href="#">${page + 1}</a>
                  </li>
                  `;
              })
              .join('')}
          </ul>
        </nav>
      `;

      const pageLinks = this.querySelectorAll('a');
      pageLinks.forEach((link) =>
        link.addEventListener('click', this.handlePageClick)
      );
    }

    get currentPage() {
      return Number(this.getAttribute('current-page'));
    }

    get totalPages() {
      return Number(this.getAttribute('total-pages'));
    }

    handlePageClick(e: Event) {
      e.preventDefault();
      const link = e.target as HTMLAnchorElement;
      const page = Number(link.getAttribute('page'));
      this.dispatchEvent(
        new CustomEvent('pagination:changed', {
          bubbles: true,
          detail: { currentPage: page },
        })
      );
    }
  }

  customElements.define('table-pagination', TablePagination);
})();
