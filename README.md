# User Management

A simple user management dashboard created with vanilla javascript (and CSS) for educational purposes.

I built this small app as an opportunity to explore some of the [native web APIs](https://developer.mozilla.org/en-US/docs/Web/API), most notably [custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components#custom_elements).

It utilizes [Reqres](https://reqres.in/) as a source of fake backend data to simulate a login flow and load initial user information. However, since the server does not allow for data mutation on the backend we retain subsequent changes in memory, which means they will be lost upon a browser refresh.

## Demo

You can see a live demo of this App in action [here](https://candid-sunburst-c11b14.netlify.app/).

## Installation

If you want to explore the code further or run the app locally, follow these steps:

1. Clone this repository to your local machine:

```bash
git clone https://github.com/tmmluis/user-management.git
```

2. Navigate to the project directory:

```bash
cd user-management
```

3. Install the project dependencies:

```bash
npm install
```

4. Start the development server:

```bash
npm run dev
```

5. Open your web browser and go to http://localhost:5173 to see the app in action.

### References

- [Custom Elements (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)
- [Custom Elements - Reusable Web Components (web.dev)](https://web.dev/articles/custom-elements-v1)
- [Building a color scheme](https://web.dev/articles/building/a-color-scheme)
